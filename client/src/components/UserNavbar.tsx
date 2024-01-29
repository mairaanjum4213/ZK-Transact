import React, { useState } from 'react';
import "../css/Navbar.css"
import logo from '../assets/icon2.png';
import Notifications from './Notifications';
import WalletDetails from './WalletDetails';
import { Link } from 'react-router-dom';
import Chats from './Chats';
import Navprofile from './Navprofile';
import { Connector, useAccount, useConnect, useDisconnect } from 'wagmi';
import { Toaster, toast } from 'react-hot-toast';

const UserNavbar: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const handleModalToggle = () => {
    setShowModal(!showModal);
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
  <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="navParent " >
        <div className='navParent pt-3 pb-3 '>
          <div className="container-fluid  px-5  ">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                <img src={logo} alt="Logo" />
              </Link>
              <ul className="nav col-12 col-lg-auto me-lg-auto mb-2  mx-md-auto mx-lg-auto justify-content-center mb-md-0">
                <li className='navLinks'><Link to="/" className="nav-link px-2  ">Home</Link></li>
                <li className='navLinks'><Link to="/buyTokens" className="nav-link px-2  ">Buy Tokens</Link></li>
                <li className='navLinks'><Link to="/sellTokens" className="nav-link px-2  ">Sell Tokens</Link></li>
                <li className='navLinks'><Link to="/tokenTransfer" className="nav-link px-2  ">Token Transfer</Link>
                  </li>

                {isConnected &&  <li className='navLinks'><span className="nav-link px-2"><WalletDetails/></span></li> }
              </ul>
  
  <div className="row text-danger">
    
  </div>

              {!isConnected && connectors.map(connector => {
                const { id } = connector;
                return (
                  <button className="btnStyle" disabled={!connector.ready} key={id} onClick={() => handleWalletConnect(connector)}>
                    Connect Wallet
                    {isLoading &&
                      connector.id === pendingConnector?.id &&
                      ' (connecting)'}
                  </button>)

              })}
              {isConnected && <button className="btnStyle" onClick={handleDisconnect}>Disconnect Wallet  </button> }

          
<Notifications/>
<Chats/>
<Navprofile/>

              {/* Do  not del nav for admin and user dashboard */}
              {/* <div className="dropdown text-end">
  <as
    href="#"
    className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <img
      src="https://github.com/mdo.png"
      alt="mdo"
      width={32}
      height={32}
      className="rounded-circle"
    />
  </a>
  <ul className="dropdown-menu text-small">
    <li>
      <a className="dropdown-item" href="#">
        New project...
      </a>
    </li>
    <li>
      <a className="dropdown-item" href="#">
        Settings
      </a>
    </li>
    <li>
      <a className="dropdown-item" href="#">
        Profile
      </a>
    </li>
    <li>
      <hr className="dropdown-divider" />
    </li>
    <li>
      <a className="dropdown-item" href="#">
        Sign out
      </a>
    </li>
  </ul>
</div>
<div className="dropdown text-end">
  <a
    href="#"
    className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <img
      src="https://github.com/mdo.png"
      alt="mdo"
      width={32}
      height={32}
      className="rounded-circle"
    />
  </a>
  <ul className="dropdown-menu text-small">
    <li>
      <a className="dropdown-item" href="#">
        New project...
      </a>
    </li>
    <li>
      <a className="dropdown-item" href="#">
        Settings
      </a>
    </li>
    <li>
      <a className="dropdown-item" href="#">
        Profile
      </a>
    </li>
    <li>
      <hr className="dropdown-divider" />
    </li>
    <li>
      <a className="dropdown-item" href="#">
        Sign out
      </a>
    </li>
  </ul>
</div>
<div className="dropdown text-end">
  <a
    href="#"
    className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <img
      src="https://github.com/mdo.png"
      alt="mdo"
      width={32}
      height={32}
      className="rounded-circle"
    />
  </a>
  <ul className="dropdown-menu text-small">
    <li>
      <a className="dropdown-item" href="#">
        New project...
      </a>
    </li>
    <li>
      <a className="dropdown-item" href="#">
        Settings
      </a>
    </li>
    <li>
      <a className="dropdown-item" href="#">
        Profile
      </a>
    </li>
    <li>
      <hr className="dropdown-divider" />
    </li>
    <li>
      <a className="dropdown-item" href="#">
        Sign out
      </a>
    </li>
  </ul>
</div> */}
            </div>
          </div>
        </div>
      </div>




    

    </>
  );
};
export default UserNavbar;
