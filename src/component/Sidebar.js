import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function Sidebar() {
  const [active, setActive] = useState(() => {
    const currentPath = window.location.pathname;
    if (currentPath === "/") return 1;
    if (currentPath === "/users") return 2;
    if (currentPath === "/orders") return 3;
    if (currentPath === "/form") return 4;
    if (currentPath === "/report") return 5;
    return null;
  });

  const [submenuOpenM, setSubmenuOpenM] = useState(false);

  const toggleSubmenuM = () => {
    setSubmenuOpenM(!submenuOpenM);
  };


  return (
    <div className="sidebar d-flex justify-content-between flex-column bg-dark text-white ps-3 py-3 pe-5 p-3 vh-100">
      <div>
        <span className="text-white text-decoration-none p-3">
          <i className="bi bi-battery-charging fs-4 me-4"></i>
          <span className="fs-3">CHARGING</span>
        </span>

        <hr className="text-white mt-2" />
        <ul className="nav nav-pills flex-column mt-3">
          {/* monitoring */}

          <li
            className={`nav-item p-2 ${submenuOpenM ? "show  bg-dark" : ""}`}
            onClick={toggleSubmenuM}
          >
            <i className="bi bi-tv fs-4 me-3"></i>
            <span className="text-decoration-none text-white p-1 dropdown-toggle">
              Monitoring
            </span>
            <div
              className={`collapse ${submenuOpenM ? "show" : ""}`}
              id="submenu2"
              aria-expanded={submenuOpenM}
            >
              <ul className="flex-column pl-2 nav">
                <li className="nav-item">
                  <Link
                    to="/monitoringtalis5"
                    className="dropdown-item text-white"
                    onClick={(e) => {
                      setActive(2);
                    }}
                  >
                    <span className="text-white text-decoration-none p-1">
                      <i className="bi bi-hdd-stack me-3 fs-4"></i>
                      <span>Talis5</span>
                    </span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/settingmonitoring"
                    className="dropdown-item text-white"
                    onClick={(e) => {
                      setActive(2);
                    }}
                  >
                    <span className="text-white text-decoration-none p-1">
                      <i className="bi bi-gear me-3 fs-4"></i>
                      <span>Setting</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <div>
        <hr className="text-white" />
        <div className="nav-item p-2">
          <span className="text-white text-decoration-none p-1">
            <i className="bi bi-person-circle me-3 fs-4"></i>
            <span>
              <strong className="fs-4">It's Me</strong>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
