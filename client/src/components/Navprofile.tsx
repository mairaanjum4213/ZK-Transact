import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../store/store";
import { RiUser2Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import "../css/ProfileDropdown.css"
import WalletDetails from './WalletDetails';
const Navprofile: React.FC = () => {
  const navigate = useNavigate();
  const setIsAuthentiacted = useAuthStore(state => state.setIsAuthenticated);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthentiacted(false);
    // Remove from localStorage
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };
  return (
    <>
      <div className="btn-group mx-1">
        <button
          type="button"
          className="btn btn-secondary   dropdown-toggle rounded-circle userProfiledp p-2 "
          data-bs-toggle="dropdown"
          data-bs-display="static"
          aria-expanded="false"
        >
          <RiUser2Fill />
        </button>
        <ul className="dropdown-menu dropdown-menu-end profileDropdownParent px-2
      "
        >


          <li style={{ textDecoration: 'none' }}>
            <Link
              to="/profile"
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
              }}
            >
              Edit Profile
            </Link>
          </li>

          <li style={{ textDecoration: 'none' }}>
            <Link
              to="/walletDetails"
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
              }}
            >
              Wallet Details
            </Link>
          </li>


          <li>Setting</li>
          <li>Meta Mask Data</li>
          <li>Meta Mask Data</li>
          <div className='text-center px-1 mt-3 pb-2'><button className="simpleButton1 w-75 " onClick={handleLogout}>Logout</button></div>
        </ul>
      </div>
    </>
  );
};
export default Navprofile;
