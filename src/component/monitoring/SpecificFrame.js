import React, { useEffect, useState } from "react";
import { monitoringBackEnd } from "../../api/axios.js";
import HeaderContent from "./utilities/HeaderContent.js";
import { useLocation } from "react-router-dom";
import ContentsFrame from "./utilities/ContentFrame.js";
import Loading from "./utilities/Loading.js";
import TempFrame from "./utilities/TempFrame.js";

function SpecificFrame() {
  const location = useLocation();
  const [frameData, setFrameData] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const pcb_barcode = searchParams.get("pcb_barcode");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await monitoringBackEnd.get(
          `api/specificFrame?pcb_barcode=${pcb_barcode}`,
          {
            timeout: 1000,
          }
        );
        setFrameData(response.data);
      } catch (error) {
        console.error("Ada kesalahan dalam mengambil data:", error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [pcb_barcode]);

  if (!frameData) {
    return <Loading />;
  }
  return (
    <>
      {/* <Navbar /> */}
      <div className="p-3 bg-light">
        <div className="container-fluid">
          {/* Header */}
          <HeaderContent
            title={frameData.data.sn_code}
            Subtitle={pcb_barcode}
          />
          {/* content */}
          <div className="row">
            <ContentsFrame api={frameData} />
            <TempFrame api={frameData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SpecificFrame;
