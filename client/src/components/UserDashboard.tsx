import BreadCrumb from './BreadCrumb';
import aboutUs from '../assets/BreadCrumbs/Aboutus.jpg';
import Chest from "../assets/chest.png";
import { FaCircle } from "react-icons/fa";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { useState } from 'react';
import { FaFilter } from "react-icons/fa6";
const UserDashboard: React.FC = () => {
  const [userOption, setUserOption] = useState("buy");
  const [period, setPeriod] = useState("Newest");
  const togglePeriod = () => {
    setPeriod((prevPeriod) => (prevPeriod === "Newest" ? "Oldest" : "Newest"));
  };
  const handleOptionChange = (e: any) => {
    setUserOption(e.target.value);
  };
  return (
    <>
      <BreadCrumb parentPageLink='/user' ParentPage="Home" pageName="User Dashboard" ChildPage="Dashboard" imageUrl={aboutUs} />
      <div className='px-5 lg:px-10 py-5'>
        <div className="flex lg:flex-row flex-col justify-between my-5 mx-3 md:mx-5 pt-3 pb-5 px-3 items-center rounded-lg bdr bgLightGret">
          <div className=" flex md:flex-row flex-col justify-center items-center ">
            <img className="w-[200px] h-[170px]" src={Chest} alt="" />
            <div className="flex flex-col  pt-5  ">
              <h2 className="font-bold  tracking-wide">ZK - Tokens</h2>
              <p>
                {/* {data?.formatted} */} data.format
                <span>
                  {/* {data?.symbol} */}
                  data.symbol
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
            {/* {sortedTokens.map((token: any, index) => ( */}
            <tr
              // key={index}
              className="text-left"
              style={{ borderBottom: "1px solid #41464580" }}
            >
              <td className="px-6 py-3 textBasic">
                {/* {token._id} */}
              </td>
              <td className="px-6 py-3 textBasic">
                {/* {new Date(
                      token.dateTimeField || token.SellTokendateTimeField
                    ).toLocaleString()} */}
                Date
              </td>
              <td className="px-6 py-3 textBasic">
                Token Amount
                {/* {token.Tokens || token.TokensAmount} */}
              </td>
              <td className="px-6 py-3 textBasic">
                Admin Name
                {/* {token.buyer?.username || token.seller?.username} */}
              </td>
              <td
              // className={`px-6 py-3 textBasic  ${token.transactionStatus === "Declined"
              //   ? "!text-red-400"
              //   : ""
              //   } ${token.transactionStatus === "Pending"
              //     ? "!text-yellow-400"
              //     : ""
              //   } ${token.transactionStatus === "Approved"
              //     ? "!text-green-400"
              //     : ""
              //   }`}
              >
                Class ko uncomment krna ha  status color class ki base pr change horha
                {/* {token.transactionStatus || token.status} */}
              </td>
            </tr>
        
        
               ))}
          </table>
        </div>
      </div>
    </>
  );
};
export default UserDashboard;
