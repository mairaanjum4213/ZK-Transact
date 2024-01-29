import React, { useState } from 'react';
import "../css/Navbar.css"
import logo from '../assets/icon2.png';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  

 
  return (
    <>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="navParent " >
        <div className='navParent pt-3 pb-3 '>
          <div className="container-fluid  px-5  ">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                <img src={logo} alt="Logo" />
              </Link>
              <ul className="nav col-12 col-lg-auto me-lg-auto mb-2  mx-md-auto mx-lg-auto mb-md-0  d-flex justify-content-center align-items-center">
                <li className='navLinks'><Link to="/" className="nav-link  ">Home</Link></li>
                <li className='navLinks'><Link to="/aboutus" className="nav-link  ">About Us</Link></li>
                <li className='navLinks'><Link to="/login" className="nav-link   ">Login</Link></li>
                <li className='navLinks'><Link to="/register" className="nav-link  ">Register</Link>
                </li>
     
              </ul>
             
          
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;