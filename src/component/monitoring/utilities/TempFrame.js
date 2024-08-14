import React from "react";
import Loading from "./Loading";

const TempFrame = ({ api }) => {
  if (!api) {
    return <Loading />;
  }
  return (
    <>
      {api.data.temp_data?.map((talis, index) => {
        let tempClass = "bi bi-brightness-high-fill";
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
                    <span>Censor {talis.censor}</span>
                  </h3>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <i className={`${tempClass} fs-1 ${textClass}`}></i>
                  </div>
                  <div>
                    <h4>
                      <span>Temperature</span>
                    </h4>
                    <h3>{talis.censor_temp} C</h3>
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
export default TempFrame;
