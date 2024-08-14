import React, { useEffect, useState } from "react";
import { monitoringBackEnd } from "../../api/axios.js";
import HeaderContent from "./utilities/HeaderContent.js";
import { useLocation } from "react-router-dom";
import ContentsRack from "./utilities/ContentsRack.js";
import Loading from "./utilities/Loading.js";

function SpecificTalis() {
  const location = useLocation();
  const [talisData, setTalisData] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const talis_id = searchParams.get("talis_id");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await monitoringBackEnd.get(
          `api/specificRack?talis_id=${talis_id}`,
          {
            timeout: 1000,
          }
        );
        setTalisData(response.data);
      } catch (error) {
        console.error("Ada kesalahan dalam mengambil data:", error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [talis_id]);

  if (!talisData) {
    return <Loading />;
  }
  return (
    <>
      {/* <Navbar /> */}
      <div className="p-3 bg-light">
        <div className="container-fluid">
          {/* Header */}
          <HeaderContent title={talis_id} />
          {/* content */}
          <div className="row">
            <ContentsRack api={talisData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SpecificTalis;
