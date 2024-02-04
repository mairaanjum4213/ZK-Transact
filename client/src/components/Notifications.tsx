import React, { useState } from 'react';
import { RiNotification2Fill } from "react-icons/ri";
import { FaCircle } from "react-icons/fa6";
import "../css/Notification.css"
const Notifications: React.FC = () => {
  return (
    <>
      <div className="btn-group mx-1">
        <button
          type="button"
          className="btn  dropdown-toggle notificationIcon rounded-circle p-2 "
          data-bs-toggle="dropdown"
          data-bs-display="static"
          aria-expanded="false"
        >
          <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"
            style={{ opacity: 1 }}>
            <span className="visually-hidden">New alerts</span>
          </span>
          <RiNotification2Fill />
        </button>
        <ul className="dropdown-menu dropdown-menu-lg-end dropdownParent  pt-0">
          <div id="notficationBg" className='p-4'>
            <p className='text-white fs-4'>
              Notifications
            </p>
            <p className='text-white'>You   have  <b>36</b> unread notification</p>
          </div>
          <div className=' p-1 d-flex justify-content-around my-3'>
            <button className='simpleButton1 '>Sending </button>
            <button className='simpleButton2'>Receiving</button>
          </div>
          <li className='d-flex justify-content-between align-items-center m-2'>
            <p>
              Transaction request approved by admin. Download the reciept.
            </p>
            <FaCircle className="notificationPointer" style={{ color: '#3eaa96cb', minWidth: "10px", minHeight: "10px" }} />
          </li>
          <li className='d-flex justify-content-between align-items-center m-2'>
            <p>
              Your request to send transaction to ***px account has been declined by admin
            </p>
            <FaCircle className="notificationPointer" style={{ color: '#3eaa96cb', minWidth: "10px", minHeight: "10px" }} />
          </li>
          <li className='d-flex justify-content-between align-items-center m-2'>
            <p>
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
export default Notifications;
