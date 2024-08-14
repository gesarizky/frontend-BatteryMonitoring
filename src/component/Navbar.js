import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.js";

function Navbar({ Toggle }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand d-none d-md-block" href="!#">
        Dashboard
      </a>
      {/* eslint-disable-next-line */}
      <a className="navbar-brand d-block d-md-none" onClick={Toggle}>
        <i className="bi bi-justify justify-icon"></i>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse invisible"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item mx-2 border rounded nav-margin">
            <a className="nav-link text-white" aria-current="page" href="!#">
              <i className="bi bi-search"></i> Search
            </a>
          </li>

          <li className="nav-item mx-2 rounded border nav-margin">
            <a className="nav-link text-white" aria-current="page" href="!#">
              Account
            </a>
          </li>

          <li className="nav-item mx-2 rounded border nav-margin">
            <a className="nav-link text-white" aria-current="page" href="!#">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
