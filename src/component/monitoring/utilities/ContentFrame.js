import React from "react";
import Loading from "./Loading";

const ContentsFrame = ({ api }) => {
  if (!api) {
    return <Loading />;
  }
  return (
    <>
      {api.data.frame_data?.map((talis, index) => {
        let batteryClass = "bi bi-battery-charging";
        let textClass = "";

        switch (talis.color) {
          case "warning":
            textClass = "text-warning";
            break;
          case "success":
            textClass = "text-success";
            break;
          case "danger":
            textClass = "text-danger";
            break;
          default:
            break;
        }
        return (
          <div
            key={index}
            className="col-12 col-sm-6 com-md-4 col-lg-3 p-3 bg-light"
          >
            <>
              <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <div>
                  <h3>
                    <span>Cell {talis.cell}</span>
                  </h3>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <i className={`${batteryClass} fs-1 ${textClass}`}></i>
                  </div>
                  <div>
                    <h4>
                      <span>Volt</span>
                    </h4>
                    <h3>{talis.cell_voltage} mV</h3>
                  </div>
                </div>
              </div>
            </>
          </div>
        );
      })}
    </>
  );
};
export default ContentsFrame;
