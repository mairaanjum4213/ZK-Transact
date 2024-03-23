import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/store";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import "../css/ProfileDropdown.css";
import { useEffect, useState } from "react";
import { getUser } from "../helper/helper";
import { jwtDecode } from "jwt-decode";

const Navprofile: React.FC = () => {
  const [userData, setUserData] = useState<any>();
  const token = localStorage.getItem("token");
  const decodedToken: any = token ? jwtDecode(token) : {};
  const username = decodedToken.username || "";
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await getUser({ username });
        if (response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, [username]);
  const navigate = useNavigate();
  const setIsAuthentiacted = useAuthStore((state) => state.setIsAuthenticated);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthentiacted(false);
    // Remove from localStorage
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };
  const { isConnected } = useAccount();

  return (
    <>
      <div className="btn-group mx-1">
        {/* { userData._id} */}
        <img
          src={
            userData?.gender === "male"
              ? "https://avatar.iran.liara.run/public/boy"
              : "https://avatar.iran.liara.run/public/girl"
          }
          alt="User Profile"
          className="  dropdown-toggle  dd rounded-circle"
          style={{ width: "37px", height: "37px" }}
          data-bs-toggle="dropdown"
          data-bs-display="static"
          aria-expanded="false"
        />
        <ul className="dropdown-menu dropdown-menu-end profileDropdownParent px-2">
          <li style={{ textDecoration: "none" }}>
            <Link
              to="/profile"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
              }}
            >
              Edit Profile
            </Link>
          </li>
          {isConnected && (
            <li style={{ textDecoration: "none" }}>
              <Link
                to="/walletDetails"
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                }}
              >
                Wallet Details
              </Link>
            </li>
          )}
          <li>Setting</li>
          <li>
           <Link to="/chats">Chat</Link>
          </li>

          <li className="flex items-center gap-2">
            {userData?.isMerchant === true ? (
              <Link to="/admin">Admin Dashboard</Link>
            ) : (
              <>
                <MdOutlineBusinessCenter className="text-yellow-600 text-lg" />
                <Link to="/consent">Become Merchant</Link>
              </>
            )}
          </li>

          <div className="text-center px-1 mt-3 pb-2">
            <button className="simpleButton1 w-75 " onClick={handleLogout}>
              Logout
            </button>
          </div>
        </ul>
      </div>
    </>
  );
};
export default Navprofile;
