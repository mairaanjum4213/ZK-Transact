import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import NormalNavbar from "./NormalNavbar";
import { useAuthStore } from "../store/store";
const Navbar: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore((state) => state.auth);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth) {
      setIsAuthenticated(storedAuth === "true");
    }
    const timeout = setTimeout(() => {
      setIsAuthenticated(false);
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("token");
      alert("Token has been expired. Please login again");
      navigate("/login");
    }, 40 * 60 * 1000);
    return () => clearTimeout(timeout);
  }, [setIsAuthenticated]);
  //For Navbar
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth) {
      setIsAuthenticated(storedAuth === "true");
    }
    const handleLogout = () => {
      setIsAuthenticated(false);
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("token");
      alert("Token has been expired. Please login again");
      navigate("/");
    };
    const lastActivityTime = localStorage.getItem("lastActivity");
    if (lastActivityTime) {
      const lastActivityTimestamp = parseInt(lastActivityTime, 10);
      const currentTime = Date.now();
      const tenMinutesInMillis = 40 * 60 * 1000;
      if (currentTime - lastActivityTimestamp > tenMinutesInMillis) {
        handleLogout();
      }
    }
    return () => {
      localStorage.setItem("lastActivity", Date.now().toString());
    };
  }, [setIsAuthenticated, navigate]);
  if (location.pathname === "/admin") {
    return null;
  }
  return <>{isAuthenticated ? <UserNavbar /> : <NormalNavbar />}</>;
};
export default Navbar;
