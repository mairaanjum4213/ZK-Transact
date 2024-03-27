import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import AOS from "aos";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "aos/dist/aos.css";
import { WagmiProvider } from "./Wagmi/WagmiContext";
import { ERC20 } from "./Wagmi/ERC20";

import "./App.css";

import Loader from "./components/Loader";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import PageNotFound from "./components/PageNotFound";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Recovery from "./components/Recovery";
import ResetPassword from "./components/ResetPassword";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import BuyTokens from "./components/buyTokens/BuyTokens.tsx";
import ScrollUp from "./components/ScrollUp";
import SellTokens from "./components/sellTokens/SellTokens.tsx";
import UserDashboard from "./components/UserDashboard.tsx";
import AdminDashboard from "./components/admin/AdminDashboard.tsx";
import BuyTokensReciept from "./components/buyTokens/BuyTokensReciept.tsx";
import BuyTokensRecieptApproved from "./components/buyTokens/BuyTokensRecieptApproved.tsx";
import SellTokensReciept from "./components/sellTokens/SellTokensReciept.tsx";
import WalletDetails from "./components/WalletDetails.tsx";
import Chat from "./components/chat/Chat.tsx";
import ChatBotFrontend from "./components/chatBot/ChatBotFrontend.tsx";
import Consent from "./components/admin/Consent.tsx";
import { useAuthStore } from "./store/store";

import CompleteViewZKTokenProvider from "./components/buyTokens/CompleteViewZKTokenProvider.tsx";
import CompleteViewZKTokenPurchasers from "./components/sellTokens/CompleteViewZKTokenPurchasers.tsx";
import CompleteZKTokenProviderProfile from "./components/buyTokens/CompleteZKTokenProviderProfile.tsx";
import CompleteZKTokenPurchasers from "./components/sellTokens/CompleteZKTokenPurchasers.tsx";
import BuyTokenApprovalPage from "./components/buyTokens/buyTokenApprovalPage.tsx";
import SellTokenApprovalPage from "./components/sellTokens/SellTokenApprovalPage.tsx";
import BuyTokensRequest from "./components/admin/BuyTokensRequest.tsx";
import SellTokensRequest from "./components/admin/SellTokensRequest.tsx";
import Faqs from "./components/Faqs.tsx";
import UserNotifications from "./components/UserNotifications.tsx";
import BuyTokenNotification from "./components/buyTokens/buyTokenNotification.tsx";
import SellTokenNotification from "./components/sellTokens/SellTokenNotification.tsx";

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
  const isAuthenticated = useAuthStore((state) => state.auth.isAuthenticated);
  const isAdmin = useAuthStore((state) => state.auth.isAdmin);
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
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/" element={<Home />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/recovery" element={<Recovery />} />
              <Route path="/reset" element={<ResetPassword />} />
              <Route path="/profile" element={<Profile />} />

              <Route
                path="/admin"
                element={isAdmin ? <AdminDashboard /> : <Login />}
              />

              <Route
                path="/user"
                element={isAuthenticated ? <UserDashboard /> : <Login />}
              />

              <Route
                path="/buyTokens"
                element={isAuthenticated ? <BuyTokens /> : <Login />}
              />
              <Route
                path="/buyTokens-reciept/:username"
                element={isAuthenticated ? <BuyTokensReciept /> : <Login />}
              />
              <Route
                path="/buyTokens-approved"
                element={
                  isAuthenticated ? <BuyTokensRecieptApproved /> : <Login />
                }
              />
              <Route
                path="/buyTokens-approval"
                element={isAuthenticated ? <BuyTokenApprovalPage /> : <Login />}
              />

              <Route
                path="/sellTokens-reciept/:username"
                element={isAuthenticated ? <SellTokensReciept /> : <Login />}
              />
              <Route
                path="/sellTokens"
                element={isAuthenticated ? <SellTokens /> : <Login />}
              />
              <Route
                path="/sellTokens-approval"
                element={
                  isAuthenticated ? <SellTokenApprovalPage /> : <Login />
                }
              />

              <Route
                path="/zkt-purchasers"
                element={
                  isAuthenticated ? (
                    <CompleteViewZKTokenPurchasers />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/user/:username"
                element={
                  isAuthenticated ? (
                    <CompleteZKTokenProviderProfile />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/user/:username"
                element={
                  isAuthenticated ? <CompleteZKTokenPurchasers /> : <Login />
                }
              />
              <Route
                path="/zkt-providers"
                element={
                  isAuthenticated ? <CompleteViewZKTokenProvider /> : <Login />
                }
              />

              <Route
                path="/tokenTransfer"
                element={isAuthenticated ? <ERC20 /> : <Login />}
              />

              <Route
                path="/chats"
                element={isAuthenticated ? <Chat /> : <Login />}
              />
              <Route
                path="/bot"
                element={isAuthenticated ? <ChatBotFrontend /> : <Login />}
              />
              <Route
                path="/consent"
                element={isAuthenticated ? <Consent /> : <Login />}
              />
              <Route
                path="/walletDetails"
                element={isAuthenticated ? <WalletDetails /> : <Login />}
              />

              <Route path="/faqs" element={isAuthenticated ? <Faqs /> : <Login />} />

              <Route
                path="/userNotifications"
                element={isAuthenticated ? <UserNotifications /> : <Login />}
              />

              <Route
                path="/buy-notification-details/:requestId"
                element={isAuthenticated ? <BuyTokenNotification/> : <Login />}
              />
              <Route
                path="/sell-notification-details/:requestId"
                element={isAuthenticated ? <SellTokenNotification/> : <Login />}
              />
            </Routes>

            <Footer />
          </>
        )}
      </WagmiProvider>
    </>
  );
}

export default App;
