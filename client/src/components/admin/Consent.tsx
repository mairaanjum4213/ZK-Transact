
import lightlogo from "../../assets/icon3.png"
import { FaCircleDot } from "react-icons/fa6"
import darkLogo from "../../assets/icon2.png"
import { useLightMode } from "color-scheme-hook";
import { useEffect, useState } from "react";
import { getUser } from "../../helper/helper";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

const Consent: React.FC = () => {
  const [isLightMode] = useLightMode();
  const token = localStorage.getItem('token');
  const decodedToken: any = token ? jwtDecode(token) : {};
  const username = decodedToken.username || '';
  const [userData, setUserData] = useState<any>("");
  const navigate = useNavigate();

// -----User Data
useEffect(() => {
  // Fetching User Data for Id
  async function fetchUserData() {
    try {
      const response = await getUser({ username });
      if (response.data) {
        setUserData(response.data)
        // To Access Id or other data of user from db just use userData._id
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  fetchUserData();
}, [username]);


const handleBecomeMerchant = async () => {
  try {
    const response = await axios.post(`/api/becomeMerchant?id=${userData._id}`);
    toast.success(response.data.message); // Display success message
    navigate('/admin');
  } catch (error) {
    toast.error('Make sure your KYC Status is true and all fields are filled'); // Display error message
  }
};

  return (
    <>
     <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="container my-11 py-10 rounded-md genericBg w-[50%] ">
        <div className="flex justify-center items-center mb-2">
          <>
            {isLightMode ? (
              <img className='' src={darkLogo} alt="Darklogo" />
            ) : (
              <img className='' src={lightlogo} alt="LightLogo" />
            )}
          </>
        </div>
        <hr className="w-9/12 mx-auto mb-2" />
        <div className=" w-full  "><br />
          To gain merchant access, you must consent to the following terms: <br /><br />
          <ul className="text-left mb-4">
            <li className="flex items-center my-1">
            <FaCircleDot className="text-teal-500 mr-2" />
              Agree to pay a monthly  minimal fee of 20 ZK Tokens as standard caharges for merchant privileges.
            </li>
            <li className="flex items-center my-2">
              <FaCircleDot className="text-teal-500 mr-2" />
              Acknowledge and abide by the terms and conditions outlined for merchant access. 
            </li>
            <li className="flex items-center my-2">
              <FaCircleDot className="text-teal-500 mr-2" />
              By consenting, you agree to adhere to the guidelines and responsibilities of an  regional merrchant.
            </li>
            <li className="flex items-center my-2">
              <FaCircleDot className="text-teal-500 mr-2" />
              Access to merchant features and functionalities will be granted upon payment confirmation.
            </li>
            <li className="flex items-center my-2">
              <FaCircleDot className="text-teal-500 mr-2" />
              The monthly fee will be automatically charged to your account on a recurring basis.
            </li>
            <li className="flex items-center my-2">
              <FaCircleDot className="text-teal-500 mr-2" />
              Failure to comply with the terms may result in the suspension or termination of administrator privileges.
            </li>
            <li className="flex items-center my-2">
              <FaCircleDot className="text-teal-500 mr-2" />
              Contact customer support for assistance or further clarification regarding administrator access.
            </li>
            <li className="flex items-center my-2">
              <FaCircleDot className="text-teal-500 mr-2" />
              Your consent signifies your understanding and acceptance of the specified terms and conditions.
            </li>
            <li className="flex items-center my-2">
              <FaCircleDot className="text-teal-500 mr-2" />
              Click "I Consent" to proceed and activate administrator privileges for your account.
            </li>
          </ul>
        </div>
        <div className="flex gap-3 flex-col items-center justify-center mt-4 ">
          <button className="block rounded-full w-44 py-2 px-4 bg-blue-600 hover:bg-blue-800 duration-700" onClick={handleBecomeMerchant}>
            I consent
          </button>
          <button className="block rounded-full w-44 py-2 px-4 bg-blue-600 hover:bg-blue-800 duration-700">
            I do not consent
          </button>
        </div>
      </div>
    </>
  );
};
export default Consent;
