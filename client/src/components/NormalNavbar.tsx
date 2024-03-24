import React, { useState } from 'react';
import "../css/Navbar.css"
import logo from '../assets/icon2.png';
import logo2 from '../assets/icon3.png';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import ConnectWallet from './ConnectWallet';
const Navbar: React.FC = () => {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <nav className="navbar navParent   navbar-expand-lg bg-white py-2">
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
              </ul>
              {/* Login / Sign up */}
              {/* to show this div crate a class and in medai query small screen pe display block  iska bad opacity ma filhal yha 0 kr rha*/}
              <div className="d-flex flex-column flex-lg-row normalBar  justify-content-center align-items-center">
                <a
                  href="#signup"
                  className="text-white text-decoration-none  select-none py-1 rounded-4"
                  style={{ backgroundColor: "#f94ca4", opacity: "0" }}
                >
                  Sign Up
                </a>
                <ConnectWallet />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;