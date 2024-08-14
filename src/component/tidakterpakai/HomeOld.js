import React, { useState } from "react";

import RectiSetting from "./child/RectiSetting";
// import EChartsExample from "./EChartsExample ";
// import PieCharts from "./PieCharts";

function Home() {
  const [dataFromChild, setDataFromChild] = useState(null);

  const receiveDataFromChild = (data) => {
    // Update state or perform any action with the received data
    const percent = data.percent;

    console.log("data : " + percent);
    setDataFromChild(data);
  };
  return (
    <>
      {/* <Navbar /> */}
      <div className="p-3 bg-light">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-6 com-md-4 col-lg-3 p-3 bg-light">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-hdd-stack fs-1 text-success"></i>
                <div>
                  <span>PCB Barcode</span>
                  <h2>{dataFromChild ? dataFromChild.frameCode : "-"}</h2>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 com-md-4 col-lg-3 p-3 bg-light">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-hdd-stack fs-1 text-success"></i>
                <div>
                  <span>SN1 Code</span>
                  <h2>{dataFromChild ? dataFromChild.frameCode : "-"}</h2>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 com-md-4 col-lg-3 p-3 bg-light">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-battery-charging fs-1 text-primary"></i>
                <div>
                  <span>Batt Voltt</span>
                  <h2>{dataFromChild ? dataFromChild.battVolt : 0}</h2>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 com-md-4 col-lg-3 p-3 bg-light">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-battery-charging fs-1 text-secondary"></i>
                <div>
                  <span>Batt Current</span>
                  <h2>{dataFromChild ? dataFromChild.battVolt : 0}</h2>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 com-md-4 col-lg-3 p-3 bg-light">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-battery fs-1 text-danger"></i>
                <div>
                  <span>Battery Total</span>
                  <h2>{dataFromChild ? dataFromChild.batteryTotal : 0}</h2>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 com-md-4 col-lg-3 p-3 bg-light">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-percent fs-1 text-dark"></i>
                <div>
                  <span>Percent</span>
                  <h2>{dataFromChild ? dataFromChild.percent : 0}</h2>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 com-md-4 col-lg-3 p-3 bg-light">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-smartwatch fs-1 text-info "></i>
                <div>
                  <span>Time Est</span>
                  <h2>{dataFromChild ? dataFromChild.timeEst : "-"}</h2>
                </div>
              </div>
            </div>

            {/* <div className="col-12 col-sm-6 com-md-4 col-lg-3 p-3 bg-light">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-graph-up-arrow fs-1 text-warning"></i>
                <div>
                  <span>Sales</span>
                  <h2>0</h2>
                </div>
              </div>
            </div> */}
          </div>
          {/* <div className="row">
            <div className="col-12 col-md-12 p-3">
              <EChartsExample />
            </div>
          </div> */}

          <div className="row">
            <RectiSetting sendDataToParent={receiveDataFromChild} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
