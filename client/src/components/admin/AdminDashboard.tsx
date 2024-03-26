import React, { useState } from "react";
import { IoStatsChart } from "react-icons/io5";
import { BiTransferAlt } from "react-icons/bi";
import { AiOutlineDollar } from "react-icons/ai";
import { FcSalesPerformance } from "react-icons/fc";
import { MdSell } from "react-icons/md";
import { PiCoinsFill } from "react-icons/pi";
import { FaWallet } from "react-icons/fa6";
import "../chat/Admindashboard.css";
import WalletDetails from "../WalletDetails";
import Chat from "../chat/Chat";
import Dashboard from "./Dashboard";
import BuyTokensRequest from "./BuyTokensRequest";
import SellTokensRequest from "./SellTokensRequest";
import Accounts from "../Accounts";
import ZKTransact from "../../assets/icon2.png";
import Navprofile from "../Navprofile";
import Notifications from "../Notifications";
import BuyTokens from "../buyTokens/BuyTokens";
import SellTokens from "../sellTokens/SellTokens";
import { ERC20 } from "../../Wagmi/ERC20";

const AdminDashboard: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState("Dashboard");
  const [focusedDiv, setFocusedDiv] = useState("Dashboard");
  const handleMenuClick = (content: string) => {
    setSelectedContent(content);
    setFocusedDiv(content);
  };

  const handleNotificationClick = (content: string, requestId: any) => {
    setSelectedContent(content);
    setFocusedDiv(content);

    if (content === "BuyRequest") {
      setSelectedRequest({ type: "buy", id: requestId });
    } else if (content === "SellRequest") {
      setSelectedRequest({ type: "sell", id: requestId });
    }
  };

  const [selectedRequest, setSelectedRequest] = useState<{
    type: string;
    id: string;
  } | null>(null);

  return (
    <>
      <div className="h-screen noScroll">
        <nav className=" sticky flex px-5 py-3 bg-white border-b shadow-md justify-between align-items-center ">
          <div>
            <img src={ZKTransact} alt="logo" />
          </div>
          <div className="flex align-items-center  gap-2">
            <div>
              <Notifications
                handleNotificationClick={handleNotificationClick}
              />
            </div>
            <div>
              <Navprofile />
            </div>
          </div>
        </nav>
        <div className="d-flex flex-lg-row flex-column gap-1 ">
          <div className=" relative w-full  lg:w-[24%]   py-md-5 py-3 px-[1.8rem] adminSide    }  ">
            <div
              id="adminSideBar"
              className="d-flex flex-lg-column h-full flex-row  gap-3 align-items-lg-start align-items-center  "
            >
              <div
                className={`flex w-full cursor-pointer   gap-2 justify-start align-items-center text-white sidebarOptions ${
                  focusedDiv === "Dashboard" ? "focusedDiv" : ""
                }`}
                onClick={() => handleMenuClick("Dashboard")}
              >
                <IoStatsChart className="text-lg" />
                <div className="h-fit text-center whitespace-nowrap rounded-lg">
                  Dashboard
                </div>
              </div>
              <div
                className={`flex w-full cursor-pointer gap-2 justify-start align-items-center text-white sidebarOptions ${
                  focusedDiv === "BuyRequest" ? "focusedDiv" : ""
                }`}
                onClick={() => handleMenuClick("BuyRequest")}
              >
                <MdSell className="text-lg" />
                <div className="text-center whitespace-nowrap rounded-lg">
                  Buy Requests
                </div>
              </div>
              <div
                className={`flex w-full cursor-pointer gap-2 justify-start align-items-center text-white sidebarOptions ${
                  focusedDiv === "SellRequest" ? "focusedDiv" : ""
                }`}
                onClick={() => handleMenuClick("SellRequest")}
              >
                <PiCoinsFill className="text-lg" />
                <div className=" whitespace-nowrap h-fit text-center rounded-lg">
                  Sell Requests
                </div>
              </div>
              <div
                className={`flex w-full cursor-pointer gap-2 justify-start align-items-center text-white sidebarOptions ${
                  focusedDiv === "Chats" ? "focusedDiv" : ""
                }`}
                onClick={() => handleMenuClick("Chats")}
              >
                <IoStatsChart className="text-lg" />
                <div className="h-fit text-center whitespace-nowrap rounded-lg">
                  Chats
                </div>
              </div>
              <div
                className={`flex w-full cursor-pointer gap-2 justify-start align-items-center text-white sidebarOptions ${
                  focusedDiv === "WalletDetails" ? "focusedDiv" : ""
                }`}
                onClick={() => handleMenuClick("WalletDetails")}
              >
                <FaWallet className="text-lg " />
                <div className="h-fit whitespace-nowrap text-center rounded-lg">
                  Metamask
                </div>
              </div>
              <div
                className={`flex w-full cursor-pointer gap-2 justify-start align-items-center text-white sidebarOptions ${
                  focusedDiv === "Accounts" ? "focusedDiv" : ""
                }`}
                onClick={() => handleMenuClick("Accounts")}
              >
                <FaWallet className="text-lg " />
                <div className="h-fit whitespace-nowrap text-center rounded-lg ">
                  Accounts
                </div>
              </div>
              <div
                className={`flex w-full cursor-pointer gap-2 justify-start align-items-center text-white sidebarOptions ${
                  focusedDiv === "buyTokens" ? "focusedDiv" : ""
                }`}
                onClick={() => handleMenuClick("buyTokens")}
              >
                <FcSalesPerformance className="text-lg text-amber-500 " />
                <div className="h-fit whitespace-nowrap text-center rounded-lg ">
                  Buy Tokens
                </div>
              </div>
              <div
                className={`flex w-full cursor-pointer gap-2 justify-start align-items-center text-white sidebarOptions ${
                  focusedDiv === "sellTokens" ? "focusedDiv" : ""
                }`}
                onClick={() => handleMenuClick("sellTokens")}
              >
                <AiOutlineDollar className="text-lg text-amber-500 " />
                <div className="h-fit whitespace-nowrap text-center rounded-lg ">
                  Sell Tokens
                </div>
              </div>
              <div
                className={`flex w-full cursor-pointer gap-2 justify-start align-items-center text-white sidebarOptions ${
                  focusedDiv === "transferTokens" ? "focusedDiv" : ""
                }`}
                onClick={() => handleMenuClick("transferTokens")}
              >
                <BiTransferAlt className="text-lg " />
                <div className="h-fit whitespace-nowrap text-center rounded-lg ">
                  Transfer Tokens
                </div>
              </div>
              <div></div>
            </div>
          </div>
          {/* noScroll */}
          <div className=" w-full h-screen overflow-y-auto  ">
            {!selectedContent ||
              (selectedContent === "Dashboard" && <Dashboard />)}
            {selectedContent === "WalletDetails" && (
              <div className="overflow-x-hidden">
                <WalletDetails />
              </div>
            )}
            {selectedContent === "Chats" && (
              <div className="w-full ">
                <Chat />
              </div>
            )}
            {selectedContent === "BuyRequest" && selectedRequest && (
              <BuyTokensRequest requestId={selectedRequest.id} />
            )}

            {selectedContent === "SellRequest" && selectedRequest && (
              <div className="overflow-x-hidden">
                  <SellTokensRequest requestId={selectedRequest.id}/>
              </div>
            
            )}

            {selectedContent === "Accounts" && (
              <div className="">
                <Accounts />
              </div>
            )}
            {selectedContent === "buyTokens" && (
              <div className="">
                <BuyTokens />
              </div>
            )}
            {selectedContent === "Accounts" && (
              <div className="">
                <Accounts />
              </div>
            )}
            {selectedContent === "sellTokens" && (
              <div className="">
                <SellTokens />
              </div>
            )}
            {selectedContent === "transferTokens" && (
              <div className="overflow-x-hidden">
                <ERC20 />
              </div>
            )}
            {selectedContent === "Accounts" && (
              <div className="">
                <Accounts />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminDashboard;
