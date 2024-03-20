import React, { useState } from 'react';
import { IoStatsChart } from "react-icons/io5";
import { MdSell } from "react-icons/md";
import { PiCoinsFill } from "react-icons/pi";
import { FaWallet } from "react-icons/fa6";
import { CgLogOut } from "react-icons/cg";
import "../chat/Admindashboard.css";
import WalletDetails from '../WalletDetails';
import Chat from '../chat/Chat';
import Dashboard from './Dashboard';
import BuyTokensRequest from './BuyTokensRequest';
import SellTokensRequest from './SellTokensRequest';
import Accounts from '../Accounts';
const AdminDashboard: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState('Dashboard');
  const [focusedDiv, setFocusedDiv] = useState('Dashboard');
  const handleMenuClick = (content: string) => {
    setSelectedContent(content);
    setFocusedDiv(content);
  };
  return (
    <>
    
      <div className="d-flex flex-lg-row flex-column   ">

        

       
        <div className="w-full  lg:w-fit py-md-0 py-3 px-5 adminSide   top-0  }  ">
          <div id="adminSideBar" className="d-flex flex-lg-column h-full flex-row my-lg-5 gap-3 align-items-lg-start align-items-center overflow-auto  ">
            <div className={`flex w-full cursor-pointer   gap-2 justify-start align-items-center text-white sidebarOptions ${focusedDiv === 'Dashboard' ? 'focusedDiv' : ''}`}
              onClick={() => handleMenuClick('Dashboard')}
            >
              <IoStatsChart className="text-lg" />
              <div className='h-fit text-center whitespace-nowrap rounded-lg'>
                Dashboard
              </div>
            </div>
            <div className={`flex w-full cursor-pointer gap-2 justify-start align-items-center text-white sidebarOptions ${focusedDiv === 'BuyRequest' ? 'focusedDiv' : ''}`}
              onClick={() => handleMenuClick('BuyRequest')}
            >
              <MdSell className="text-lg" />
              <div className='text-center whitespace-nowrap rounded-lg' >
                Buy Requests
              </div>
            </div>
            <div className={`flex w-full cursor-pointer gap-2 justify-start align-items-center text-white sidebarOptions ${focusedDiv === 'SellRequest' ? 'focusedDiv' : ''}`}
              onClick={() => handleMenuClick('SellRequest')}
            >
              <PiCoinsFill className="text-lg" />
              <div className=' whitespace-nowrap h-fit text-center rounded-lg' >
                Sell Requests
              </div>
            </div>
            <div className={`flex w-full cursor-pointer gap-2 justify-start align-items-center text-white sidebarOptions ${focusedDiv === 'Chats' ? 'focusedDiv' : ''}`}
              onClick={() => handleMenuClick('Chats')}
            >
              <IoStatsChart className="text-lg" />
              <div className='h-fit text-center whitespace-nowrap rounded-lg' >
                Chats
              </div>
            </div>
            <div className={`flex w-full cursor-pointer gap-2 justify-start align-items-center text-white sidebarOptions ${focusedDiv === 'WalletDetails' ? 'focusedDiv' : ''}`}
              onClick={() => handleMenuClick('WalletDetails')}
            >
              <FaWallet className="text-lg " />
              <div className='h-fit whitespace-nowrap text-center rounded-lg' >
                Metamask
              </div>
            </div>
            <div className={`flex w-full cursor-pointer gap-2 justify-start align-items-center text-white sidebarOptions ${focusedDiv === 'Accounts' ? 'focusedDiv' : ''}`}
              onClick={() => handleMenuClick('Accounts')}
            >
              <FaWallet className="text-lg " />
              <div className='h-fit whitespace-nowrap text-center rounded-lg' >
                Accounts
              </div>
            </div>
          </div>
       

        </div>

        <div className="w-full lg:w-full">
          {!selectedContent || selectedContent === 'Dashboard' && (
            <Dashboard />
          )}
          {selectedContent === 'WalletDetails' && (
            <div className=''>
              <WalletDetails />
            </div>
          )}
          {selectedContent === 'Chats' && (
            <div className='w-full '>
              <Chat />
            </div>
          )}
          {selectedContent === 'BuyRequest' && (
            <BuyTokensRequest />
          )}
          {selectedContent === 'SellRequest' && (
            <SellTokensRequest />
          )}
          {selectedContent === 'Accounts' && (
            <div className=''>
              <Accounts />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default AdminDashboard;