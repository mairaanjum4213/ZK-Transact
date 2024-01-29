// // import React, { useState } from 'react';
import "../css/Chats.css"
import { FaCircle } from "react-icons/fa6";
import { IoChatboxEllipses } from "react-icons/io5";
const Chats: React.FC = () => {
  return (
    <>
      <div className="btn-group mx-1">
        <button
          type="button"
          className="btn  dropdown-toggle chatIcon rounded-circle p-2 "
          data-bs-toggle="dropdown"
          data-bs-display="static"
          aria-expanded="false"
        >
          <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"
            style={{ opacity: 1 }}>
            <span className="visually-hidden">New alerts</span>
          </span>
          <IoChatboxEllipses />
        </button>
        <ul className="dropdown-menu dropdown-menu-lg-end dropdownParent  pt-0">
          <div id="notficationBg" className='p-4'>
            <p className='text-white fs-4'>
              Chats
            </p>
            <p className='text-white'>You   have  <b>36</b> un read messages</p>
          </div>
          <li className='d-flex justify-content-between align-items-center m-2'>
            <p>
              <p>Faheem Siddiqi</p>
              Send me 1000 zk tokens
            </p>
            <FaCircle className="notificationPointer" />
          </li>
          <li className='d-flex justify-content-between align-items-center m-2'>
            <p>
              <p>Maira Anjum</p>
              Transfer into your account see
            </p>
            <FaCircle className="notificationPointer" />
          </li>
          <li className='d-flex justify-content-between align-items-center m-2'>
            <p>
              <p>Faheem Siddiqi</p>
              Alisha Anjum sent 1000 ZK Tokens
            </p>
            <FaCircle className="notificationPointer" style={{ opacity: "0" }} />
          </li>
          <li className='notificationloader  text-center  py-2'>
            <div className="spinner-border " role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </li>
          <div id="" className='my-2 d-flex justify-content-around align-items-center'>
            <p className='clearAll'>Clear All</p>
          </div>
        </ul>
      </div>
    </>
  );
};
// 
export default Chats;
