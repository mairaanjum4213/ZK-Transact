import { useNavigate} from 'react-router-dom';
import { useAuthStore } from "../store/store";
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
      <div className="dropdown">
        <button className="btn dropdown-toggle profileNav  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          F
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a className="dropdown-item" href="#">Settings</a></li>
          <li><a className="dropdown-item" href="#">Meta Mask Data (nextppt)</a></li>
          <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>
    </>
  );
};
export default Navprofile;
