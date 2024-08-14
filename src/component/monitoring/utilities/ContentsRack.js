import React from "react";
import Loading from "./Loading";

const ContentsRack = ({ api }) => {
  if (!api) {
    return <Loading />;
  }
  return (
    <>
      {api.data.rack_data?.map((talis, index) => {
        let batteryClass = "bi bi-battery";
        let textClass = "";
        let colClass = "col-lg-3";

        switch (talis.color) {
          case "warning":
            batteryClass = "bi bi-battery-half";
            textClass = "text-warning";
            break;
          case "success":
            batteryClass = "bi bi-battery-full";
            textClass = "text-success";
            break;
          case "danger":
            textClass = "text-danger";
            break;
          default:
            break;
        }

        switch (api.data.rack_data.length) {
          case 1:
            colClass = "col-lg-12";
            break;
          case 2:
            colClass = "col-lg-6";
            break;
          default:
            break;
        }
        return (
          <div
            key={index}
            className={`col-12 col-sm-6 com-md-4 ${colClass} p-3 bg-light`}
          >
            <a
              href={`/specificframe?pcb_barcode=${talis.pcb_barcode}`}
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <div>
                  <h2>
                    <span>{talis.sn_code}</span>
                  </h2>
                  <div>
                    <span>{talis.pcb_barcode}</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <i className={`${batteryClass} fs-1 ${textClass}`}></i>
                  </div>
                  <div>
                    <h4>
                      <span>SOC</span>
                    </h4>
                    <h3>{talis.soc} %</h3>
                  </div>
                </div>
              </div>
            </a>
          </div>
        );
      })}
    </>
  );
};
export default ContentsRack;
