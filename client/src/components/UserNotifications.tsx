import React, { useEffect, useState } from "react";
import { RiNotification2Fill } from "react-icons/ri";
import { FaCircle } from "react-icons/fa6";
import "../css/Notification.css";
import axios from "axios";
import { getUser } from "../helper/helper";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

const UserNotifications: React.FC = () => {
  const [buyOrSell, setBuyOrSell] = useState<string>("null");
  const [buyRequests, setBuyRequests] = useState<any[]>([]);
  const [sellRequests, setSellRequests] = useState<any[]>([]);

  const token = localStorage.getItem("token");
  const decodedToken: any = token ? jwtDecode(token) : {};
  const username = decodedToken.username || "";
  const [userData, setUserData] = useState<any>("");
  const navigate = useNavigate(); 

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await getUser({ username });
        if (response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, [username]);

  useEffect(() => {
    const fetchApprovedBuyRequests = async () => {
      try {
        if (userData && userData._id) {
          const response = await axios.get(`/api/buyToken/buyer/${userData._id}`);
          setBuyRequests(response.data);
        }
      } catch (error) {
        console.error("Error fetching approved or declined buy token requests:", error);
      }
    };
  
    const fetchApprovedSellRequests = async () => {
      try {
        if (userData && userData._id) {
          const response = await axios.get(`/api/sellToken/seller/${userData._id}`);
          setSellRequests(response.data);
        }
      } catch (error) {
        console.error("Error fetching approved or declined sell token requests:", error);
      }
    };
  
    const intervalId = setInterval(() => {
      fetchApprovedBuyRequests();
      fetchApprovedSellRequests();
    }, 10000);
  
    return () => clearInterval(intervalId);
  }, [userData]);

  const handleNotification = (requestId: string, type: string) => {
    if (type === "buy") {
      navigate(`/buy-notification-details/${requestId}`);
    } else if (type === "sell") {
      navigate(`/sell-notification-details/${requestId}`);
    }
  };


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
        <span
            className="position-absolute top-1 left-7 translate-middle p-1 bg-danger border border-light rounded-circle"
            style={{ opacity: 1 }}
          >
            <span className="visually-hidden">New alerts</span>
          </span>
          <RiNotification2Fill />
        </button>
        <ul className="dropdown-menu dropdown-menu-lg-end dropdownParent  rounded-lg pt-0">
          <div id="notficationBg" className="p-4">
            <p className="text-white fs-4">Notifications</p>
           
          </div>
          <div className=" p-1  mx-2 d-flex justify-content-center  gap-4 my-3">
            <button
              className="simpleButton1 w-40"
              onClick={(e) => {
                e.stopPropagation();
                setBuyOrSell("buy");
              }}
            >
              Buy Tokens
            </button>
            <button
              className="simpleButton2 w-40"
              onClick={(e) => {
                e.stopPropagation();
                setBuyOrSell("sell");
              }}
            >
              Sell Tokens
            </button>
          </div>
          {buyOrSell === "sell" && (
            <>
              {sellRequests.length > 0 &&
                sellRequests.map((request, index) => (
                  <li
                    key={index}
                    className="d-flex justify-content-between align-items-center m-2"
                    onClick={() => handleNotification(request._id, "sell")}
                  >
                    <p>Your sell token request of {request?.Tokens} zkt has been "{request?.transactionStatus}" by admin {request?.seller?.purchaserName}. Click to see details</p>
                    <FaCircle
                      className={`notificationPointer ${request?.transactionStatus === "Approved" || request?.transactionStatus === "Declined" ? 'text-teal-600' : 'hidden'}`}
                      style={{
                        minWidth: "10px",
                        minHeight: "10px",
                      }}
                    />
                  </li>
                ))}
            </>
          )}

          {buyOrSell === "buy" && (
            <>
            {buyRequests.length > 0 &&
                buyRequests.map((request, index) => (
                  <li
                    key={index}
                    className="d-flex justify-content-between align-items-center m-2"
                    onClick={() => handleNotification(request._id, "buy")}
                  >
                   <p>Your buy token request of {request?.localCurrency}PKR has been "{request?.status}" by admin {request?.seller?.serviceProviderName}.Click to see details</p>
                    <FaCircle
                      className={`notificationPointer ${request?.status === "Approved" || request?.status === "Declined" ? 'text-teal-600' : 'hidden'}`}
                      style={{
                        
                        minWidth: "10px",
                        minHeight: "10px",
                      }}
                    />
                  </li>
                ))}
            </>
          )}
          <div
            id=""
            className="mb-2 mt-5 d-flex justify-content-around align-items-center"
          >
            <p className="text-sm">ZK Transact</p>
          </div>
        </ul>
      </div>
    </>
  );
};
export default UserNotifications;
