import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getUser } from "../../helper/helper";
import { BsSignStopFill } from "react-icons/bs";
import lightlogo from "../../assets/icon3.png";
import darkLogo from "../../assets/icon2.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdOutlineContentCopy } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { useDarkMode, useLightMode } from "color-scheme-hook";
import "../../css/BuyTokensReciept.css";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;
// wagmi imports
import ConnectWallet from "../ConnectWallet.tsx";
import {
  useAccount,
  useBalance,
  useContractWrite,
  useContractReads,
  useWaitForTransaction,
  usePrepareContractWrite,
} from "wagmi";
import { BigNumber } from "bignumber.js";
import contractABI from "../../Wagmi/data.json";
import { useNavigate } from "react-router-dom";
interface BuyTokensRequestProps {
  requestId: string;
}
const BuyTokensRequest: React.FC<BuyTokensRequestProps> = ({ requestId }) => {
  const navigate = useNavigate();
  const [requestState, setRequestState] = useState("loading");
  const [decision, setDecision] = useState<String>("null");
  const [requestData, setRequestData] = useState<any>(null);
  const [isLightMode] = useLightMode();
  const [userData, setUserData] = useState<any>();
  const token = localStorage.getItem("token");
  const decodedToken: any = token ? jwtDecode(token) : {};
  const username = decodedToken.username || "";
  const handleCopyToClipboardWalletAddresss = () => {
    toast.success("Wallet Address Copied");
  };
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
    const fetchSellRequestData = async () => {
      try {
        const response = await axios.get(`/api/userwithbuytoken/${requestId}`);
        setRequestData(response.data);
        setRequestState("success");
      } catch (error) {
        console.error("Error fetching sell request data:", error);
      }
    };
    fetchSellRequestData();
  }, [requestId]);
  const showreceipt = (receipt: string) => {
    window.open(`http://localhost:8080/uploads/${receipt}`);
  };
  console.log(requestData?.buyReceipt);
  const accountsAndwallets =
    userData &&
    userData.accounts &&
    userData.accounts.length !== 0 &&
    userData.wallet;
  // Transfer Wagmi logic from erc 20
  const [amount, setAmount] = useState<number | string>(0);
  const [address, setAddress] = useState<number | string>("");
  const { address: metamaskaddress } = useAccount();
  const [tokenError, setTokenError] = useState("");
  const [metamaskError, setMetamaskError] = useState("");

  const { isConnected } = useAccount();
  const wagmigotchiContract = {
    address: import.meta.env.VITE_SMART_ADD2,
    abi: [...contractABI.abi] as any,
  } as const;
  const { data: useContractReadsData } = useContractReads({
    contracts: [{ ...wagmigotchiContract, functionName: "name" }],
  });
  const value = useContractReadsData?.[0].result;
  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_SMART_ADD2,
    abi: contractABI.abi,
    functionName: "transfer",
    args: [address, amount],
  });
  const { data: useContractWriteData, write } = useContractWrite(config);
  const {
    data: useWaitForTransactionData,
    isSuccess,
    isLoading,
  } = useWaitForTransaction({
    hash: useContractWriteData?.hash,
  });
  useEffect(() => {}, [useContractWriteData, useWaitForTransactionData]);
  const { data } = useBalance({
    address: metamaskaddress,
    token: "0x00a8Db0104a6b0C6a3d0a61ADC1Ea8f3b1cd8855",
  });
  const balance = data?.formatted;
  const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredAmount = e.target.value;
    setTransferTokenAmount(enteredAmount);
    // Check if the entered value is a negative number
    if (Number(enteredAmount) < 0) {
      toast.error("Please enter a positive number");
      setAmount(0);
      return;
    }
    if (balance === undefined) {
      toast.loading("Fetching balance...");
      return;
    }
    if (Number(balance) < Number(enteredAmount)) {
      toast.error("Insufficient tokens");
      setAmount(0);
      return;
    }
    const amountInWei = new BigNumber(enteredAmount).times(
      new BigNumber(10).pow(18)
    );
    setAmount(amountInWei.toString(10));
    setTokenError("");
  };
  const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value as number | string);
    setBeneficiaryMetamask(e.target.value);
    setMetamaskError("");
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Transaction Successful");
    }
    if (requestData) {
      const buyTokenRequestId = requestData._id;
      const adminComments =
        "Your request to buy tokens has been approved. In case you didn't receive tokens chat with admin";
      handleApprovedBuyToken(buyTokenRequestId, adminComments);
    }
  }, [isSuccess, useContractWriteData]);
  const [beneficiaryMetamask, setBeneficiaryMetamask] = useState<string>("");
  const [transferTokenAmount, setTransferTokenAmount] = useState<any>();
  const [transferSuccess, setTransferSuccess] = useState(false);
 
  const handleApprovedBuyToken = async (id: string, adminComments: string) => {
    try {
      const response = await axios.put(`/api/buyToken/approved/${id}`, {
        adminComments,
      });
      toast.success("User request to buy tokens approved successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error("Error approving buy tokens request");
    }
  };

  useEffect(() => {
    if (isSuccess && !transferSuccess) {
      setTransferSuccess(true);
    }

  }, [isSuccess, transferSuccess]);

  const handleTransferClick = () => {
    // Check if Metamask address matches requestData Metamask address
    if (address != requestData?.metamaskAddress) {
      setMetamaskError("Metamask address does not match");
      return;
    }

    // Check if transferTokenAmount matches requestData token amount
    if (transferTokenAmount != requestData?.TokensAmount) {
      setTokenError("Token amount does not match");
      return;
    }

    if (write) {
      write();
    }

  };

  const [adminComments, setAdminComments] = useState<string>("");

  const handleRejectBuyToken = async (id: string, comments: string) => {
    try {
      const response = await axios.put(`/api/buyToken/reject/${id}`, {
        adminComments: comments,
      });
      toast.error("User request to buy tokens rejected");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error("Error rejecting buy tokens request");
    }
  };

  const handleRejectionClick = () => {
    if (requestData) {
      const buyTokenRequestId = requestData._id;
      handleRejectBuyToken(buyTokenRequestId, adminComments);
    }
  };

  const handleAdminCommentsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAdminComments(e.target.value);
  };

  if (requestState === "loading") {
    return <p>Loading...</p>; 
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div>
        {accountsAndwallets ? (
          <>
            <h2 className="mt-5 mx-5 fw-bold">Buy Tokens Request</h2>
            <div
              className="mx-5 mb-4 w-11/12 rounded  border mt-5  "
              id="printReciept"
            >
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                  <div className=" rounded-lg p-4">
                    <div className="card-body ">
                      <div className="invoice-container">
                        <div className="invoice-header">
                          {/* Row start */}
                          <div className="row gutters">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                              <p
                                className="fs-5 fw-bold my-5"
                                style={{ letterSpacing: "2px" }}
                              >
                                Token Purshase Reciept
                              </p>
                              {isLightMode ? (
                                <img
                                  className="mx-2"
                                  src={darkLogo}
                                  alt="DarkLogo"
                                />
                              ) : (
                                <img
                                  className="mx-2"
                                  src={lightlogo}
                                  alt="LightLogo"
                                />
                              )}
                              <div
                                className="text-secondary mt-4"
                                style={{ fontSize: "small" }}
                              >
                                {requestData?.dateTimeField}
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                              <p className="normalTextColor text-right fs-6">
                                {userData?.username}
                              </p>
                              <p className="text-secondary text-right mt-1">
                                {userData?.email}
                              </p>
                              <p className="text-secondary text-right mt-1">
                                {userData?.region}
                              </p>
                            </div>
                          </div>
                          <div className="row gutters">
                            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                              <div className="invoice-details">
                                <p className="normalTextColor fs-6   ">
                                  {requestData?.buyer?.username}
                                </p>
                                <p className="text-secondary  mt-1">
                                  {requestData?.buyer?.email}
                                </p>
                              </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                              <div className="invoice-details">
                                <div className="invoice-num">
                                  <div className="normalTe">
                                    <p>Invoice</p>
                                    <p className="text-sm">
                                      {requestData?._id}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="invoice-body">
                          <div className="row gutters">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                              <div className="table-responsive p-3 ">
                                <table className="table custom-table     ">
                                  <thead>
                                    <tr>
                                      <th className="fs-6 customTableth ">
                                        User Meta Mask
                                      </th>
                                      <th className="fs-6 customTableth">
                                        Local Currency
                                      </th>
                                      <th className="fs-6 customTableth">
                                        Fee
                                      </th>
                                      <th className="fs-6 customTableth">
                                        Token Purchased
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="p-3 customTabletd">
                                        {requestData?.metamaskAddress}
                                        <CopyToClipboard
                                          text={requestData?.metamaskAddress}
                                          style={{
                                            display: "inline",
                                            cursor: "-webkit-grabbing",
                                          }}
                                        >
                                          <MdOutlineContentCopy
                                            onClick={
                                              handleCopyToClipboardWalletAddresss
                                            }
                                            className=" UsernameCopyicon mx-2"
                                            style={{ display: "inline" }}
                                          />
                                        </CopyToClipboard>
                                      </td>
                                      <td className="p-3 customTabletd">
                                        {" "}
                                        {requestData?.localCurrency}{" "}
                                      </td>
                                      <td className="p-3 customTabletd">
                                        {requestData?.transactionFee}{" "}
                                      </td>
                                      <td className="p-3 customTabletd">
                                        {requestData?.TokensAmount}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div className="link-wrapper">
                                  <button
                                    className=" mt-4   hover-2"
                                    onClick={() =>
                                      showreceipt(requestData?.buyReceipt)
                                    }
                                    style={{
                                      cursor: "-webkit-grabbing",
                                      cursor: "grabbing",
                                    }}
                                  >
                                    Show Bank Receipt
                                  </button>
                                </div>
                              </div>
                              <div className="flex align-items-center justify-center gap-4  ">
                                <button
                                  className="simpleButton1"
                                  onClick={() => setDecision("reject")}
                                >
                                  Reject Request
                                </button>
                                <button
                                  className="simpleButton2"
                                  onClick={() => setDecision("approve")}
                                >
                                  Approve Request
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Adding wagmi here to avoid props */}
            {isConnected ? (
              <div
                className={`my-3 ${
                  decision === "approve" ? "block" : "hidden"
                }`}
              >
                <div className="mx-5">
                  <div className=" mt-2">
                    <div className="flex align-items-center justify-between mb-4">
                      <h2 className=" fw-bold tracking-wider">
                        Approve Transfer
                      </h2>
                      <ConnectWallet />
                    </div>
                    <div className="" style={{ fontSize: "large" }}>
                      Total Balance
                      <span className="text-secondary mx-2">
                        {data?.formatted}
                        {"ZKT"}
                      </span>
                    </div>
                  </div>
                  <form
                    className="row d-flex justify-content-center mt-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <input
                      style={{ width: "65%" }}
                      id="Transfer"
                      className="InputReg cursor-auto"
                      type="number"
                      onChange={handleInputChange1}
                      value={transferTokenAmount}
                      placeholder="Enter tokens"
                    />
                    {tokenError && <p className="text-danger">{tokenError}</p>} {/* Display token error */}
                    <div className="row  d-flex justify-content-center mt-4 ">
                      <input
                        className="InputReg cursor-auto"
                        style={{ width: "65%" }}
                        type="text"
                        onChange={handleInputChange2}
                        placeholder="Copy metamask address from above and paste here"
                        value={beneficiaryMetamask}
                      />
                    </div>
                    {metamaskError && <p className="text-danger">{metamaskError}</p>} {/* Display Metamask error */}
                    <div className="row d-flex justify-content-center mt-5  mb-5 ">
                      <button
                        style={{ minWidth: "45%" }}
                        className="btnStyle "
                        disabled={!write || amount == 0}
                        onClick={handleTransferClick}
                      >
                        Transfer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <>
                <h2 className="my-3 mx-5 fw-semibold">Transfer Zk Tokens</h2>
                <div className="flex justify-center flex-col   align-items-center text-red-500 text-lg">
                  <p> Please Connect the wallet first.</p>
                  <div className="w-fit">
                    <div className="my-4">
                      <ConnectWallet />
                    </div>
                  </div>
                </div>
              </>
            )}
            <div
              id="Reject"
              className={`align-items-center ${
                decision === "reject" ? "block" : "hidden"
              }`}
            >
              <h2 className="mx-5 mb-4 font-bold">Reject User Request</h2>
              <div className="flex flex-col align-items-center">
                <textarea
                  className="w-7/12 h-[5rem] row-4 InputReg"
                  placeholder="Enter Reason For Rejection"
                  value={adminComments}
                  onChange={handleAdminCommentsChange}
                />
                <div className="w-5/12">
                  <button
                    className="standarButton-1 my-4"
                    onClick={handleRejectionClick}
                  >
                    Reject Request
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {userData &&
              userData.accounts &&
              userData.accounts.length === 0 && (
                <>
                  <div className="absolute top-1/2 left-[44%] w-full h-fit">
                    <div className="flex align-items-center gap-2">
                      <BsSignStopFill className="text-red-800 w-10 h-10" />
                      <p className="text-xl  tracking-wider">
                        Add Local Bank Account to Provide Services
                      </p>
                    </div>
                  </div>
                </>
              )}
            {/* Check if wallet is empty */}
            {!userData ||
              (!userData.wallet && (
                <div className="absolute top-[60%] left-[44%] w-full h-fit ">
                  <div className="flex align-items-center gap-2">
                    <BsSignStopFill className="text-red-800 w-10 h-10" />
                    <p className="text-xl  tracking-wider">
                      Add Meta Mask to Provide Services
                    </p>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
      <div></div>
    </>
  );
};
export default BuyTokensRequest;
