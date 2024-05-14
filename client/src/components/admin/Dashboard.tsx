import Chest from "../../assets/chest.png";
import Chart from "react-apexcharts";
import { useDarkMode, useLightMode } from "color-scheme-hook";
import { FaExchangeAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { useEffect, useState } from "react";
import MoneyIcon from "../../assets/moneyIcon.png";
import { FaFilter } from "react-icons/fa6";
import axios from "axios";
import { useAccount, useBalance } from "wagmi";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;
import ConnectWallet from "../../components/ConnectWallet.tsx";
import { jwtDecode } from "jwt-decode";
import { getUser } from "../../helper/helper.tsx";
const Dashboard: React.FC = () => {
  const [isLightMode] = useLightMode();
  // Graphs
  const [pieGraphData, setPieGraphData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });
  // Graphs
  const { isConnected } = useAccount();
  const { address: metamaskaddress } = useAccount();
  const { data } = useBalance({
    address: metamaskaddress,
    token: "0x00a8Db0104a6b0C6a3d0a61ADC1Ea8f3b1cd8855",
  });
  const [userOption, setUserOption] = useState("buy");
  const [graphOption, setGraphOption] = useState(true);
  const [period, setPeriod] = useState("Newest");
  const token = localStorage.getItem("token");
  const decodedToken: any = token ? jwtDecode(token) : {};
  const [userData, setUserData] = useState<any>();
  const username = decodedToken.username || "";
  //1
  const [approvedSellTokens, setApprovedSellTokens] = useState<any[]>([]);
  const [approvedBuyTokens, setApprovedBuyTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  //2
  const [sellPendingCount, setSellPendingCount] = useState(0);
  const [buyPendingCount, setBuyPendingCount] = useState(0);
  const [sellApprovedCount, setSellApprovedCount] = useState(0);
  const [buyApprovedCount, setBuyApprovedCount] = useState(0);
  const [sellDeclinedCount, setSellDeclinedCount] = useState(0);
  const [buyDeclinedCount, setBuyDeclinedCount] = useState(0);
  //3
  const [recentApprovedSellTokens, setRecentApprovedSellTokens] = useState<
    any[]
  >([]);
  const [recentApprovedBuyTokens, setRecentApprovedBuyTokens] = useState<any[]>(
    []
  );
  //4
  const [sellTokens, setSellTokens] = useState([]);
  const [buyTokens, setBuyTokens] = useState([]);
  //5
  const [sellTransactionsPerDay, setSellTransactionsPerDay] = useState([]);
  const [buyTransactionsPerDay, setBuyTransactionsPerDay] = useState([]);
  const buyDates = buyTransactionsPerDay.map((transaction) => transaction._id);
  const buyCount = buyTransactionsPerDay.map(
    (transaction) => transaction?.count
  );
  const sellDates = sellTransactionsPerDay.map(
    (transaction) => transaction._id
  );
  const sellCount = sellTransactionsPerDay.map(
    (transaction) => transaction?.count
  );
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
  //1
  useEffect(() => {
    const fetchApprovedTokenRequests = async () => {
      try {
        const response = await axios.get(`/api/buysell/approved/${username}`);
        setApprovedSellTokens(response.data.approvedSellTokens);
        setApprovedBuyTokens(response.data.approvedBuyTokens);
      } catch (error) {
        setError("Error fetching approved token requests");
        console.error("Error fetching approved token requests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApprovedTokenRequests();
  }, []);
  //2
  useEffect(() => {
    const fetchTokenRequestsCount = async () => {
      try {
        const response = await axios.get(`/api/buysell/allreq/${username}`);
        const {
          sellPendingCount,
          sellApprovedCount,
          sellDeclinedCount,
          buyPendingCount,
          buyApprovedCount,
          buyDeclinedCount,
        } = response.data;
        setSellPendingCount(sellPendingCount);
        setBuyPendingCount(buyPendingCount);
        setSellApprovedCount(sellApprovedCount);
        setBuyApprovedCount(buyApprovedCount);
        setSellDeclinedCount(sellDeclinedCount);
        setBuyDeclinedCount(buyDeclinedCount);
      } catch (error) {
        console.error("Error fetching token requests count:", error);
        setError("Error fetching token requests count");
      } finally {
        setLoading(false);
      }
    };
    fetchTokenRequestsCount();
  }, []);
  //3
  useEffect(() => {
    const fetchRecentApprovedTokenRequests = async () => {
      try {
        const response = await axios.get(
          `/api/buysell/recentapproved/${username}`
        );
        const { approvedSellTokens, approvedBuyTokens } = response.data;
        setRecentApprovedSellTokens(approvedSellTokens);
        setRecentApprovedBuyTokens(approvedBuyTokens);
      } catch (error) {
        console.error("Error fetching recent approved token requests:", error);
        setError("Error fetching recent approved token requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRecentApprovedTokenRequests();
  }, []);
  //4
  useEffect(() => {
    const fetchTokenRequests = async () => {
      try {
        const response = await axios.get(`/api/buysell/all/${username}`);
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
  }, []);
  //5
  useEffect(() => {
    const fetchTokenRequestsForAdminGraph = async () => {
      try {
        const response = await axios.get(`/api/buysell/allgraph/${username}`);
        const { sellTransactionsPerDay, buyTransactionsPerDay } = response.data;
        setSellTransactionsPerDay(sellTransactionsPerDay);
        setBuyTransactionsPerDay(buyTransactionsPerDay);
      } catch (error) {
        console.error("Error fetching token requests for admin graph:", error);
        setError("Error fetching token requests for admin graph");
      } finally {
        setLoading(false);
      }
    };
    fetchTokenRequestsForAdminGraph();
  }, []);
  if (loading) {
    return <div className="text-center ">Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleGraphOption = (e: any) => {
    setGraphOption(!graphOption);
  };
  const handleOptionChange = (e: any) => {
    setUserOption(e.target.value);
  };
  const togglePeriod = () => {
    setPeriod((prevPeriod) => (prevPeriod === "Newest" ? "Oldest" : "Newest"));
  };
  const filteredTokens = userOption === "buy" ? buyTokens : sellTokens;
  const sortedTokens =
    period === "Newest" ? filteredTokens : filteredTokens.slice().reverse();
  return (
    <>
      {isConnected ? (
        <>
          <div className="flex lg:flex-row flex-col justify-between my-5 mx-3 md:mx-5 pt-3 pb-5 px-3 items-center rounded-lg bdr bgLightGret">
            <div className=" flex md:flex-row flex-col justify-center items-center ">
              <img className="w-[200px] h-[170px]" src={Chest} alt="" />
              <div className="flex flex-col  pt-5  ">
                <h2 className="font-bold  tracking-wide">ZK - Tokens</h2>
                <p>
                  {data?.formatted}
                  <span>{data?.symbol}</span>
                </p>
                <p>Standard Charges: {userData?.merchantFee} percent</p>
                <Link
                  className="text-primaryColor  border-b border-primaryColor w-fit"
                  to="/adminFee"
                >
                  Set Fee
                </Link>
              </div>
            </div>
            <div className="flex flex-col  pt-4">
              <div className="text-green-500 flex items-center   gap-1">
                <FaCircle className="text-[10px]" />
                Sufficient Reserves / Low Resevers
              </div>
              <button className="btn  simpleButton1 w-fit my-2 ">
                Mint Tokens
              </button>
            </div>
          </div>
          {/*  */}
          <div className="flex lg:flex-row flex-col lg:mx-0 mx-3 -mt-[2.5rem]  !justify-center items-center  ">
            <div className="lg:w-[30%] w-full p-4  lg:mx-0 ml=0 lg:!ml-[2rem]  mx-3 my-5  rounded-lg  bgLightGret">
              <p className="text-xl !mb-4 ">Top Buy Transactions</p>
              <div
                id="carouselExampleAutoplayingBuy"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {approvedBuyTokens.map((token, index) => (
                    <div
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                      key={index}
                    >
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src={`https://avatar.iran.liara.run/username?username=${token.buyer.username}`}
                          alt="User Avatar"
                          className="w-[100px] h-[100px]"
                        />
                        <p className="text-lg mt-3">{token.buyer.username}</p>
                        <p className="text-sm text-primaryColor font-bold">
                          Buy
                        </p>
                        <p className="text-sm">{token.TokensAmount} ZkT</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev w-4 h-3 mt-[25%] opacity-1  lightCar "
                  type="button"
                  data-bs-target="#carouselExampleAutoplayingBuy"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next w-4 h-3 mt-[25%] opacity-1 lightCar  "
                  type="button"
                  data-bs-target="#carouselExampleAutoplayingBuy"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div className="lg:w-[30%] w-full p-4  lg:mx-0 ml=0 lg:!ml-[2rem]  mx-3 my-5  rounded-lg  bgLightGret">
              <p className="text-xl !mb-4 ">Top Sell Transaction </p>
              <div
                id="carouselExampleAutoplayingSell"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {/* Render approved sell tokens */}
                  {approvedSellTokens.map((token, index) => (
                    <div
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                      key={index}
                    >
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src={`https://avatar.iran.liara.run/username?username=${token.seller.username}`}
                          alt="User Avatar"
                          className="w-[100px] h-[100px]"
                        />
                        <p className="text-lg mt-3">{token.seller.username}</p>
                        <p className="text-sm text-red-500 font-bold">Sell</p>
                        <p className="text-sm">{token.Tokens} ZkT</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev w-4 h-3 mt-[25%] opacity-1 lightCar "
                  type="button"
                  data-bs-target="#carouselExampleAutoplayingSell"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next w-4 h-3 mt-[25%] opacity-1 rounded-full lightCar "
                  type="button"
                  data-bs-target="#carouselExampleAutoplayingSell"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon "
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div className="lg:w-[33%]   w-full p-4 lg:mx-0 mx-3 items-center rounded-lg bdr bgLightGret ">
              <p className="text-xl "> Transactions Requests</p>
              <div className="text-primaryColor flex items-center mb-[2rem] gap-1">
                <FaCircle className="text-[8px]" />
                <p className="capitalize">
                  {" "}
                  {graphOption === true ? "Buy" : "Sell"}{" "}
                </p>
                <FaExchangeAlt
                  className=" cursor-pointer text-[0.7rem] mx-2"
                  onClick={handleGraphOption}
                  style={{ zIndex: "1000" }}
                />
                <div></div>
              </div>
              <div className="flex lg:flex-row flex-col justify-between items-center gap-5 ">
                <div className="">
                  <div className="ml-5 mt-1 w-[200px] h-[140px] pt-[2rem] flex items-end justify-center ">
                    {graphOption === true && (
                      <>
                        <Chart
                          className=" "
                          series={[
                            buyApprovedCount,
                            buyPendingCount,
                            buyDeclinedCount,
                          ]}
                          type="donut"
                          width="400"
                          height="400"
                          options={{
                            labels: ["Accepted", "Pendings", "Rejected"],
                            // colors: ["#900E7F", "#151C52", "#165AC3"],
                            dataLabels: {
                              enabled: false,
                            },
                            plotOptions: {
                              pie: {
                                expandOnClick: false,
                                donut: {
                                  size: "88%",
                                  labels: {
                                    show: true,
                                    value: {
                                      color: "#34A28E",
                                      fontSize: 25,
                                    },
                                    total: {
                                      label: "Requests",
                                      show: true,
                                      fontSize: 25,
                                      color: "#34A28E",
                                    },
                                  },
                                },
                                customScale: 0.5,
                                expandOnClick: true,
                              },
                            },
                          }}
                        />
                      </>
                    )}
                    {graphOption === false && (
                      <>
                        <Chart
                          className=" "
                          series={[
                            sellApprovedCount,
                            sellPendingCount,
                            sellDeclinedCount,
                          ]}
                          type="donut"
                          width="400"
                          height="400"
                          options={{
                            labels: ["Accepted", "Pendings", "Rejected"],
                            dataLabels: {
                              enabled: false,
                            },
                            plotOptions: {
                              pie: {
                                expandOnClick: false,
                                donut: {
                                  size: "88%",
                                  labels: {
                                    show: true,
                                    value: {
                                      color: "#34A28E",
                                      fontSize: 25,
                                    },
                                    total: {
                                      label: "Requests",
                                      show: true,
                                      fontSize: 25,
                                      color: "#34A28E",
                                    },
                                  },
                                },
                                customScale: 0.5,
                              },
                            },
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex lg:flex-row flex-col lg:mr-5">
            <div className="lg:w-[70%]  w-full p-4 lg:mx-0 mx-3 items-center rounded-lg bdr bgLightGret  ">
              <p className="text-xl  ">Graphical Analysis </p>
              <div className="flex my-2 gap-2 items-center  simpleButton1 w-fit">
                <FaFilter />
                <select
                  className="bg-transparent outline-none w-full"
                  name="requestType"
                  id="requestType"
                  onChange={handleOptionChange}
                  style={{ zIndex: 100 }}
                >
                  <option className=" text-primaryColor" value="buy">
                    Buy Requests
                  </option>
                  <option className=" text-primaryColor" value="sell">
                    Sell Requests
                  </option>
                </select>
              </div>
              {userOption === "buy" && (
                <>
                  <Chart
                    clsasName=''
                    type="line"
                    options={{
                      theme: {
                        mode: isLightMode ? "light" : "dark",
                      }
                      ,
                      chart: {
                        id: "line-chart",
                        background: 'transparent'
                      },
                      xaxis: {
                        categories: buyDates,
                      },
                    }}
                    series={[
                      {
                        name: "No of Transactions",
                        data: buyCount,
                      },
                    ]}
                    height={350}
                  />
                </>
              )}
              {userOption === "sell" && (
                <>
                  <Chart
                    type="line"
                    options={{
                      theme: {
                        mode: isLightMode ? "light" : "dark",
                      },
                      chart: {
                        id: "line-chart",
                        background: 'transparent'
                      },
                      xaxis: {
                        categories: sellDates,
                      },
                    }}
                    series={[
                      {
                        name: "No of Transactions",
                        data: sellCount,
                      },
                    ]}
                    height={350}
                  />
                </>
              )}
            </div>
            <div className="lg:w-[34%]  w-full p-4 lg:mx-0 mx-3 items-center rounded-lg bdr bgLightGret overflow-auto ">
              <p className="text-xl !mb-4 ">Recent Approved Transactions</p>
              {recentApprovedBuyTokens.length > 0 && (
                <div>
                  <div className="flex items-center justify-start">
                    <img src={MoneyIcon} alt="MoneyIcon" className="w-8" />
                    <p className="text-lg ">Buy</p>
                  </div>
                  {recentApprovedBuyTokens.map((transaction, index) => (
                    <div
                      className="flex flex-col justify-start mb-2"
                      key={index}
                    >
                      <p className="text-primaryColor">
                        {" "}
                        + {transaction.TokensAmount} ZKT
                      </p>
                      <p className="text-md">
                        {transaction.TokensAmount} ZKT purchased by{" "}
                        {transaction.buyer.username}
                      </p>
                      <hr className="my-3 w-11/12" />
                    </div>
                  ))}
                </div>
              )}
              {recentApprovedSellTokens.length > 0 && (
                <div>
                  <div className="flex items-center justify-start">
                    <img src={MoneyIcon} alt="MoneyIcon" className="w-8" />
                    <p className="text-lg ">Sell</p>
                  </div>
                  {recentApprovedSellTokens.map((transaction, index) => (
                    <div
                      className="flex flex-col justify-start mb-2"
                      key={index}
                    >
                      <p className="text-primaryColor">
                        {" "}
                        - {transaction.Tokens} ZKT
                      </p>
                      <p className="text-md">
                        {transaction.Tokens} ZKT sold by{" "}
                        {transaction.seller.username}
                      </p>
                      <hr className="my-3 w-11/12" />
                    </div>
                  ))}
                </div>
              )}
              <a href="#table" className=" border-b">
                {" "}
                View All
              </a>
            </div>
          </div>
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
                  <td className="px-6 py-3 textBasic">{token._id}</td>
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
        </>
      ) : (
        <>
          <div className="flex justify-center flex-col self-center align-items-center h-screen text-red-500 text-lg">
            <p> Please Connect the wallet first.</p>
            <div className="w-fit">
              <div className="">
                <ConnectWallet />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Dashboard;
