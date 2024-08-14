import React from "react";
import sundayaLogo from "../img/Sundaya_Logo.png"; // Import your image file

function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="p-3 bg-light">
        <div className="container-fluid">
          <div className="row">
            <div className="p-5 bg-light">
              <div className="p-1 bg-white rounded p-4">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <img
                      className="img-centered-view"
                      src={sundayaLogo}
                      alt="Scan Frame"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
