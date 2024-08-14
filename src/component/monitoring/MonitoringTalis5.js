import React, { useCallback, useEffect, useState } from "react";
import { monitoringBackEnd } from "../../api/axios.js";
import HeaderContent from "./utilities/HeaderContent.js";
import ContentsDashboard from "./utilities/ContentsDashboard.js";
import Pagination from "./utilities/Pagination.js";
import Loading from "./utilities/Loading.js";

function MonitoringTalis5() {
  const [page, setPage] = useState(1);
  const [dashboard, setDashboard] = useState(null);

  const fetchData = useCallback( async () => {
    try {
      const response = await monitoringBackEnd.get(
        `/api/dashboard?page=${page}`,
        {
          timeout: 1000,
        }
      );
      setDashboard(response.data);
    } catch (error) {
      console.error("Ada kesalahan dalam mengambil data:", error);
    }
  },[page]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData]); // Menambahkan page sebagai dependensi

  if (!dashboard) {
    return <Loading />;
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="p-3 bg-light">
        <div className="container-fluid">
          {/* Header */}
          <HeaderContent title={"Talis 5"} />
          {/* content */}
          <div className="row">
            <ContentsDashboard api={dashboard} />
          </div>
          {/* pagination */}
          <div className="d-flex justify-content-center mt-3">
            <Pagination
              page={page}
              lastPage={dashboard.pagination?.last_visible_page}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MonitoringTalis5;
