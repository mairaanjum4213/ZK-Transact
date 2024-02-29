import {Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'aos/dist/aos.css';
import { WagmiProvider } from './Wagmi/WagmiContext';
import { ERC20 } from './Wagmi/ERC20';

import './App.css';

import Loader from './components/Loader';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import PageNotFound from './components/PageNotFound';
import Login from './components/Login';
import Footer from './components/Footer';
import Register from './components/Register';
import Recovery from './components/Recovery';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import BuyTokens from './components/buyTokens/BuyTokens.tsx';
import ZKtokeProviderProfile from './components/buyTokens/ZKtokeProviderProfile.tsx';
import ViewZKtokensProviders from './components/buyTokens/ViewZKtokensProviders.tsx';
import ZKtokePurchaserProfile from "./components/sellTokens/ZKtokePurchaserProfile.tsx";
import ViewZKtokensPurchasers from './components/sellTokens/ViewZKtokensPurchasers.tsx';

import ScrollUp from './components/ScrollUp';
import SellTokens from './components/sellTokens/SellTokens.tsx';
import UserDashboard from './components/UserDashboard.tsx';
import AdminDashboard from './components/admin/AdminDashboard.tsx';
import BuyTokensReciept from './components/buyTokens/BuyTokensReciept.tsx';
import BuyTokensRecieptApproved from './components/buyTokens/BuyTokensRecieptApproved.tsx';
import SellTokensReciept from './components/sellTokens/SellTokensReciept.tsx'
import KYCrequiredModal from './components/KYCrequiredModal';
import WalletDetails from './components/WalletDetails.tsx';




function App() {


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init();
    
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);


/*  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        jwt.verify(token,ENV.JWT_SECRET );
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
        localStorage.removeItem('token'); // Remove invalid token
        navigate("/login")

      }
    } else {
      setIsLoggedIn(false);
    }
  }, []); */

  return (
    <>
      <WagmiProvider>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Navbar />
            <ScrollUp />
            <Routes>

              <Route path="/user" element={<UserDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/zkt-purchaser-profile" element={<ZKtokePurchaserProfile />} />
              <Route path="/zkt-purchasers" element={<ViewZKtokensPurchasers />} />
              <Route path="/buyTokens-reciept" element={<BuyTokensReciept />} />
              <Route path="/buyTokens-  " element={<BuyTokensRecieptApproved/>} />
              <Route path="/sellTokens-reciept" element={<SellTokensReciept />} />
              <Route path="/zkt-provider-profile" element={<ZKtokeProviderProfile />} />
              <Route path="/zkt-providers" element={<ViewZKtokensProviders />} />
              <Route path="/buyTokens" element={<BuyTokens />} />
              <Route path="/sellTokens" element={<SellTokens />} />
              <Route path="/tokenTransfer" element={<ERC20 />} />
              <Route path="/" element={<Home />} />
              <Route path="/testing" element={<KYCrequiredModal />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/recovery" element={<Recovery />} />
              <Route path="/reset" element={<ResetPassword />} />
              <Route path="/walletDetails" element={<WalletDetails/>} />
              <Route path="/profile" element={ <Profile />}/>
            </Routes>

            <Footer />
          </>
        )}
      </WagmiProvider>
    </>
  );
}

export default App;