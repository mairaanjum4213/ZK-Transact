import React, { useEffect } from 'react';
import UserNavbar from './UserNavbar';
import NormalNavbar from './NormalNavbar';
import { useAuthStore } from "../store/store";
const Navbar: React.FC = () => {
 
  const { isAuthenticated } = useAuthStore(state => state.auth);
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);
  useEffect(() => {
    // Retrieve isAuthenticated from localStorage during initial mount
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth) {
      setIsAuthenticated(storedAuth === 'true');
    }
  }, [setIsAuthenticated]);
  return (
    <>
    {isAuthenticated ? <UserNavbar /> : <NormalNavbar />}
    </>
  );
};
export default Navbar;
