import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import NormalNavbar from './NormalNavbar';
import { useAuthStore } from "../store/store";
const Navbar: React.FC = () => {
  const location = useLocation();
  
 
  const { isAuthenticated } = useAuthStore(state => state.auth);
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);
  useEffect(() => {
    // Retrieve isAuthenticated from localStorage during initial mount
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth) {
      setIsAuthenticated(storedAuth === 'true');
    }
  }, [setIsAuthenticated]);

  if (location.pathname === '/admin') {
    return null;
  }
  
  return (
    <>
    {isAuthenticated ? <UserNavbar /> : <NormalNavbar />}
    </>
  );
};
export default Navbar;
