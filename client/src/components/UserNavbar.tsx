import React, { useState } from 'react';
import "../css/Navbar.css"
import logo from '../assets/icon2.png';
import logo2 from '../assets/icon3.png';
import { Link } from 'react-router-dom';
import NavChats from './NavChats';
import Navprofile from './Navprofile';
// import { Connector, useAccount, useConnect, useDisconnect } from 'wagmi';
import { Toaster, toast } from 'react-hot-toast';
import UserNotifications from './UserNotifications';
const UserNavbar: React.FC = () => {
 
  // const { connectAsync, connectors, isLoading, pendingConnector } = useConnect();
  // const { disconnect } = useDisconnect();
  // const { isConnected } = useAccount();
  // const handleWalletConnect = async (connector: Connector) => {
  //   const { chain } = await connectAsync({ connector });
  //   if (chain.unsupported) {
  //     toast.error("Please connect with sepolia");
  //     disconnect();
  //   }
  // }
  // const handleDisconnect = () => {
  //   disconnect();
  // }
  return (
    <>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <nav className="navbar navParent  navbar-expand-lg bg-white  py-3">
        {/* problem1 solved using container fluid isntead of container as container has z-index-1  */}
        <div className="container-fluid px-5">
          <Link to="aboutus" className="navbar-brand fs-4 ">
            <img  src={logo} alt="Logo" />
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
              <ul className="navbar-nav  gap-1 justify-content-center fs-5 align-items-center flex-grow-1 pe-3">
              
              <li className="nav-item">
                  <Link to="/user" className="nav-link active " aria-current="page">Home</Link>
                </li>

                <li className="nav-item">
                  <Link to="/buytokens" className="nav-link active" aria-current="page">Buy Tokens</Link>
                </li>
                <li className="nav-item ">
                  <Link to="/selltokens" className="nav-link active" aria-current="page">Sell Tokens</Link>
                </li>
                <li className="nav-item ">
                  <Link to="/tokenTransfer" className="nav-link active" aria-current="page">Transfer Tokens</Link>
                </li>
               
              </ul>
              <div className="d-flex flex-column flex-lg-row   justify-content-center align-items-center gap-3">
                {/* Wallet Connection Button */}
                {/* {!isConnected && connectors.map(connector => {
                  const { id } = connector;
                  return (
                    <button className="btnStyle w-fit h-fit  py-3 px-3" disabled={!connector.ready} key={id} onClick={() => handleWalletConnect(connector)}>
                      Connect Wallet
                      {isLoading &&
                        connector.id === pendingConnector?.id &&
                        ' (connecting)'}
                    </button>)
                })}
                {isConnected && <button className="btnStyle" onClick={handleDisconnect}>Disconnect Wallet  </button>} */}
                <div className='d-flex justify-content-center gap-2 align-items-center'>
                  <UserNotifications />
                  <NavChats />
                  <Navprofile />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default UserNavbar;
