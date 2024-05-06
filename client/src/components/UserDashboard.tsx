import BreadCrumb from './BreadCrumb';
import aboutUs from '../assets/BreadCrumbs/Aboutus.jpg';
import Chest from "../assets/chest.png";
import { FaCircle } from "react-icons/fa";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { useEffect, useState } from 'react';
import { FaFilter } from "react-icons/fa6";
import { useAccount, useBalance } from "wagmi";
import ConnectWallet from "../components/ConnectWallet"
import { jwtDecode } from "jwt-decode";

import axios from "axios";
import { getUser } from '../helper/helper';
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

const UserDashboard: React.FC = () => {
  const { isConnected } = useAccount();
  const { address: metamaskaddress } = useAccount();
  const { data } = useBalance({
    address: metamaskaddress,
    token: "0x00a8Db0104a6b0C6a3d0a61ADC1Ea8f3b1cd8855",
  });

  const token = localStorage.getItem("token");
  const decodedToken: any = token ? jwtDecode(token) : {};
  const [userData, setUserData] = useState<any>();
  const username = decodedToken.username || "";
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sellTokens, setSellTokens] = useState([]);
  const [buyTokens, setBuyTokens] = useState([]);

  const [userOption, setUserOption] = useState("buy");
  const [period, setPeriod] = useState("Newest");

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

  useEffect(() => {
    if (!userData) return;
    const fetchTokenRequests = async () => {
      try {
        const response = await axios.get(`/api/buysell/buyerseller/${userData?._id}`);
        setSellTokens(response.data.sellTokens);
        setBuyTokens(response.data.buyTokens);
      } catch (error) {
        setError("Error fetching token requests");
        console.error("Error fetching token requests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTokenRequests();
  }, [userData]);

  if (loading) {
    return <div className="text-center ">Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  const togglePeriod = () => {
    setPeriod((prevPeriod) => (prevPeriod === "Newest" ? "Oldest" : "Newest"));
  };
  const handleOptionChange = (e: any) => {
    setUserOption(e.target.value);
  };

  const filteredTokens = userOption === "buy" ? buyTokens : sellTokens;
  const sortedTokens =
    period === "Newest" ? filteredTokens : filteredTokens.slice().reverse();

  return (
    <>
      <BreadCrumb parentPageLink='/user' ParentPage="Home" pageName="User Dashboard" ChildPage="Dashboard" imageUrl={aboutUs} />
      {isConnected ? (
        <>
  <div className='px-5 lg:px-10 py-5'>
        <div className="flex lg:flex-row flex-col justify-between my-5 mx-3 md:mx-5 pt-3 pb-5 px-3 items-center rounded-lg bdr bgLightGret">
          <div className=" flex md:flex-row flex-col justify-center items-center ">
            <img className="w-[200px] h-[170px]" src={Chest} alt="" />
            <div className="flex flex-col  pt-5  ">
              <h2 className="font-bold  tracking-wide">ZK - Tokens</h2>
              <p>
                 {data?.formatted}
                <span>
                   {data?.symbol} 
                 
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col  pt-4">
            <div className="text-green-500 flex items-center   gap-1">
              <FaCircle className="text-[10px]" />
              Sufficient Reserves / Low Resevers
            </div>
          </div>
        </div>
        {/*  */}
        <div className="relative overflow-x-auto rounded-lg bdr bgLightGret mr-3 ml-3  lg:ml-4 lg:mr-8 my-5 p-4">
          <p className="text-xl  ">Tabular Analysis </p>
          <p className="mt-3">
            Tabular Analysis of <span>{userOption}</span> requests in{" "}
            {period === "Newest"
              ? "newest to oldest order"
              : "oldest to newest order"}{" "}
          </p>
          <div className="flex my-2 gap-2 items-center absolute right-5 simpleButton1 w-fit">
            <FaFilter />
            <select
              className="bg-transparent outline-none w-full"
              name="requestType"
              id="requestType"
              onChange={handleOptionChange}
            >
              <option className=" text-primaryColor" value="buy">
                Buy Requests
              </option>
              <option className=" text-primaryColor" value="sell">
                Sell Requests
              </option>
            </select>
          </div>
          <br />
          <table
            id="table"
            className="w-full whitespace-nowrap !text-center my-5"
          >
            <thead>
              <tr className="border-b border-primaryColor text-left">
                <th className="px-6 py-3 text-md font-bold text-primaryColor uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3  text-md font-bold text-primaryColor uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3  text-md font-bold text-primaryColor uppercase tracking-wider">
                  ZK Tokens
                </th>
                <th className="px-6 py-3  text-md font-bold text-primaryColor uppercase tracking-wider">
                  User Name
                </th>
                <th className="px-6 py-3  text-md font-bold text-primaryColor uppercase tracking-wider">
                  Status
                </th>
                <CgArrowsExchangeAltV
                  className="text-3xl mt-[0.71rem] cursor-pointer hover:text-primaryColor duration-300"
                  onClick={togglePeriod}
                />
              </tr>
            </thead>
            <tbody className="border-t"></tbody>
            {sortedTokens.map((token: any, index) => ( 
            <tr
               key={index}
              className="text-left"
              style={{ borderBottom: "1px solid #41464580" }}
            >
              <td className="px-6 py-3 textBasic">
                {token._id} 
              </td>
              <td className="px-6 py-3 textBasic">
                {new Date(
                      token.dateTimeField || token.SellTokendateTimeField
                    ).toLocaleString()}
                
              </td>
              <td className="px-6 py-3 textBasic">
              
                {token.Tokens || token.TokensAmount} 
              </td>
              <td className="px-6 py-3 textBasic">
               
                {token.buyer?.username || token.seller?.username}
              </td>
              <td
               className={`px-6 py-3 textBasic  ${token.transactionStatus === "Declined"
               ? "!text-red-400"
               : ""
               } ${token.transactionStatus === "Pending"
                 ? "!text-yellow-400"
                 : ""
               } ${token.transactionStatus === "Approved"
                 ? "!text-green-400"
                 : ""
               }`}
              >
    
                 {token.transactionStatus || token.status} 
              </td>
            </tr>
            ))}
        
               
          </table>
        </div>
      </div>
        </>
      )
      :
      (
        <>
          <div className="flex justify-center flex-col  my-[20%]  align-items-center text-red-500 text-lg">
            <p> Please Connect the wallet first.</p>
            <div className="w-fit">
              <div className="my-4">
                <ConnectWallet />
              </div>
            </div>
          </div>
        </>
      )
      }
    
    </>
  );
};
export default UserDashboard;
