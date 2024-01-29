

import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { WagmiProvider } from './Wagmi/WagmiContext';
import Loader from './components/Loader';
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import PageNotFound from './components/PageNotFound';
import Login from "./components/Login"
import Footer from "./components/Footer"
import Register from "./components/Register"
import Recovery from './components/Recovery';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import BuyTokens from './components/BuyTokens';
import { ERC20 } from './Wagmi/ERC20';
import ScrollUp from './components/ScrollUp';
import SellTokens from './components/SellTokens';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init();

    // Simulate a delay to test the loading state
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

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
              <Route path="/buyTokens" element={<BuyTokens />} />
              <Route path="/sellTokens" element={<SellTokens />} />
              <Route path="/tokenTransfer" element={<ERC20 />} />
              <Route path="/" element={<Home />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/recovery" element={<Recovery />} />
              <Route path="/reset" element={<ResetPassword />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer />
          </>
        )}
      </WagmiProvider>
    </>
  );
}

export default App;