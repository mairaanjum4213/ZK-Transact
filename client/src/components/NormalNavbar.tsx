import React, { useState } from 'react';
import "../css/Navbar.css"
import logo from '../assets/icon2.png';
import logo2 from '../assets/icon3.png';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
const Navbar: React.FC = () => {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <nav className="navbar navParent   navbar-expand-lg bg-white py-3">
        <div className="container">
          <Link to="aboutus" className="navbar-brand fs-4 ">
            <img src={logo} alt="Logo" />
          </Link>
          <button
            className="navbar-toggler shadow-none border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className=" sidebar offcanvas offcanvas-start "
            tabIndex={-1}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header text-white border-bottom ">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                <img src={logo2} alt="Logo" />
              </h5>
              <button
                className="btn-close btn-close-white shadow-none"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body d-flex flex-column  flex-lg-row p-lg-0">
              <ul className="navbar-nav  justify-content-center fs-5 align-items-center flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                </li>
                <li className="nav-item mx-2">
                  <Link to="/aboutus" className="nav-link active" aria-current="page">About Us</Link>
                </li>
                <li className="nav-item mx-2">
                  <Link to="/login" className="nav-link active" aria-current="page">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link active" aria-current="page">Register</Link>
                </li>
                {/* Drop Down  */}
                {/* <li className="nav-item dropdown mx-2 ">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </li> */}
              </ul>
              {/* Login / Sign up */}
              {/* to show this div crate a class and in medai query small screen pe display block  iska bad opacity ma filhal yha 0 kr rha*/}
              <div className="d-flex flex-column flex-lg-row normalBar  justify-content-center align-items-center gap-3">
                <a href="#login" style={{ opacity: "0" }} className="">Login</a>
                <a
                  href="#signup"
                  className="text-white text-decoration-none px-3 py-1 rounded-4"
                  style={{ backgroundColor: "#f94ca4", opacity: "0" }}
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;