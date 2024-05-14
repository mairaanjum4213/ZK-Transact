import React, { useEffect, useState } from "react";
import { RiNotification2Fill } from "react-icons/ri";
import { FaCircle } from "react-icons/fa6";
import "../css/Notification.css";
import axios from "axios";
import { getUser } from "../helper/helper";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;
interface NotificationsProps {
  handleNotificationClick: (content: string, requestId: any) => void;
}
const Notifications: React.FC<NotificationsProps> = ({
  handleNotificationClick,
}) => {
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
    // Fetch pending buy token requests for admin
    const fetchPendingBuyRequests = async () => {
      try {
        const response = await axios.get(`/api/buyToken/pending/${username}`);
        setBuyRequests(response.data);
      } catch (error) {
        console.error("Error fetching pending buy token requests:", error);
      }
    };
    // Fetch pending sell token requests for admin
    const fetchPendingSellRequests = async () => {
      try {
        const response = await axios.get(`/api/sellToken/pending/${username}`);
        setSellRequests(response.data);
      } catch (error) {
        console.error("Error fetching pending sell token requests:", error);
      }
    };
    const intervalId = setInterval(() => {
      fetchPendingBuyRequests();
      fetchPendingSellRequests();
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);
  // Function to handle request click
  const handleNotification = (requestId: string, type: string) => {
    if (type === "buy") {
      handleNotificationClick("BuyRequest", requestId);
    } else if (type === "sell") {
      handleNotificationClick("SellRequest", requestId);
    }
  };
  return (
    <>
      <div className="btn-group mx-1 z-[2000]"
     >
        <button
          type="button"
          className="btn  relative dropdown-toggle notificationIcon rounded-circle p-2 "
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
        <ul className="dropdown-menu dropdown-menu-lg-end dropdownParent  rounded-lg pt-0"
        style={{zIndex:'1000'}}>
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
                    <p>
                      You have received sell token request from{" "}
                      {request?.seller?.username} with status "
                      {request?.transactionStatus}"
                    </p>
                    <FaCircle
                      className={`notificationPointer ${
                        request?.status === "Pending"
                          ? "text-teal-600"
                          : "hidden"
                      }`}
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
                    <p>
                      You have received buy token request from{" "}
                      {request?.buyer?.username} with status "{request?.status}"
                    </p>
                    <FaCircle
                      className={`notificationPointer ${
                        request?.status === "Pending"
                          ? "text-teal-600"
                          : "hidden"
                      }`}
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
export default Notifications;
