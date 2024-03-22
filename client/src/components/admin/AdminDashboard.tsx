import React, { useState } from 'react';
import { IoStatsChart } from "react-icons/io5";
import { MdSell } from "react-icons/md";
import { PiCoinsFill } from "react-icons/pi";
import { FaWallet } from "react-icons/fa6";
import "../chat/Admindashboard.css";
import WalletDetails from '../WalletDetails';
import Chat from '../chat/Chat';
import Dashboard from './Dashboard';
import BuyTokensRequest from './BuyTokensRequest';
import SellTokensRequest from './SellTokensRequest';
import Accounts from '../Accounts';
import ZKTransact from "../../assets/icon2.png"
import Navprofile from '../Navprofile';
import Notifications from '../Notifications';
import { Connector, useAccount, useConnect, useDisconnect } from 'wagmi';
import { Toaster, toast } from 'react-hot-toast';
const AdminDashboard: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState('Dashboard');
  const [focusedDiv, setFocusedDiv] = useState('Dashboard');
  const handleMenuClick = (content: string) => {
    setSelectedContent(content);
    setFocusedDiv(content);
  };
  const { connectAsync, connectors, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();
  const handleWalletConnect = async (connector: Connector) => {
    const { chain } = await connectAsync({ connector });
    if (chain.unsupported) {
      toast.error("Please connect with sepolia");
      disconnect();
    }
  }
  const handleDisconnect = () => {
    disconnect();
  }
  return (
    <>
      <div className='h-screen noScroll'>
        <nav className=' sticky flex px-5 py-3 bg-white border-b shadow-md justify-between align-items-center ' >
          <div>
            <img src={ZKTransact} alt="logo" />
          </div>
          <div className="flex align-items-center  gap-2">
            <div>
              <Notifications />
            </div>
            <div>
              <Navprofile />
            </div>
          </div>
        </nav>
        <div className="d-flex flex-lg-row flex-column gap-1 ">
          <div className=" relative w-full  lg:w-[24%]   py-md-5 py-3 px-[1.8rem] adminSide    }  ">
            <div id="adminSideBar" className="d-flex flex-lg-column h-full flex-row  gap-3 align-items-lg-start align-items-center overflow-auto  "  >
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
                <div className='h-fit whitespace-nowrap text-center rounded-lg ' >
                  Accounts
                </div>
              </div>
              <div className={`flex w-full cursor-pointer gap-2 justify-center align-items-center text-white sidebarOptions ${isConnected ? ("connectWallet") : ("disconnectWallet")}`}
                onClick={() => handleMenuClick('Connect Wallet')}>
                {!isConnected && connectors.map(connector => {
                  const { id } = connector;
                  return (
                    <button className="" disabled={!connector.ready} key={id} onClick={() => handleWalletConnect(connector)}>
                      Connect Wallet
                      {isLoading &&
                        connector.id === pendingConnector?.id &&
                        ''}
                    </button>)
                })}
                {isConnected && <button className="" onClick={handleDisconnect}>Disconnect </button>}
              </div>
              <div>
              </div>
            </div>
          </div>
          {/* noScroll */}
          <div className=" w-full h-screen overflow-y-auto  "
          >
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
      </div>
    </>
  );
};
export default AdminDashboard;