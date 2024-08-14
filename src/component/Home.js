import React from "react";
import sundayaLogo from "../img/Sundaya_Logo.png"; // Import your image file

// import EChartsExample from "./EChartsExample ";
// import PieCharts from "./PieCharts";

function ChargingTalis5() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="p-3">
        <div className="container-fluid">
          <div className="row">
            <img
              className="img-centered-view"
              src={sundayaLogo}
              alt="Scan Frame"
            />
          </div>

          {/* <div className="row">
            <RectiSetting sendDataToParent={receiveDataFromChild} />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default ChargingTalis5;
