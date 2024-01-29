import React, { useState } from 'react';
import "../css/navDetails.css"
import { AiFillBell } from "react-icons/ai";
import { RiMessageFill } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
const Notifications: React.FC = () => {
 
  return (
    <>
{/* <button

type="button" className="btn  position-relative">
<AiFillBell  className="notificatonIcon"/> <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill "><FaCircle className="circleIcon" style={{ color:"#B82424" } }/> <span className="visually-hidden">unread messages</span></span>
</button> */}

<button type="button" className="btn  position-relative">
<IoMdNotificationsOutline  className="notificatonIcon"/> 
</button>














        
    </>
  );
};
// 
export default Notifications;
