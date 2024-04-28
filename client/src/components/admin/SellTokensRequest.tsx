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
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;
import { useParams } from "react-router-dom";
interface SellTokensRequestProps {
  requestId: string;
}
const SellTokensRequest: React.FC<SellTokensRequestProps> = ({ requestId }) => {
  const [decision, setDecision] = useState<String>("null");
  const [requestState, setRequestState] = useState("loading");
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
        const response = await axios.get(`/api/userwithselltoken/${requestId}`);
        setRequestData(response.data);
        setRequestState("success");
      } catch (error) {
        console.error("Error fetching sell request data:", error);
      }
    };
    fetchSellRequestData();
  }, [requestId]);
  const accountsAndwallets =
    userData &&
    userData.accounts &&
    userData.accounts.length !== 0 &&
    userData.wallet;

  const [adminComments, setAdminComments] = useState<string>("");

  const handleRejectSellToken = async (id: string, comments: string) => {
    try {
      const response = await axios.put(`/api/sellToken/reject/${id}`, {
        commentsByAdmin: comments,
      });
      toast.error("User request to sell tokens rejected");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error("Error rejecting sell tokens request");
    }
  };

  const handleRejectionClick = () => {
    if (requestData) {
      const sellTokenRequestId = requestData._id;
      handleRejectSellToken(sellTokenRequestId, adminComments);
    }
  };

  const handleAdminCommentsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAdminComments(e.target.value);
  };

  
  const handleApprovedBuyToken = async (id: string, commentsByAdmin: string) => {
    try {
      const response = await axios.put(`/api/sellToken/approved/${id}`, {
        commentsByAdmin,
      });
      toast.success("User request to sell tokens approved successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error("Error approving sell tokens request");
    }
  };

  const handleApprovalClick = () => {
    if (requestData) {
        const sellTokenRequestId = requestData._id;
        const commentsByAdmin =
          "Your request to sell tokens has been approved. In case you didn't receive amount chat with admin";
        handleApprovedBuyToken(sellTokenRequestId, commentsByAdmin);
      }
  };

  if (requestState === "loading") {
    return <p>Loading...</p>; 
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <h2 className="fw-bold mt-5 mx-5">Sell Tokens Requests</h2>
      {accountsAndwallets ? (
        <>
          <div
            className="mx-5 mb-3 border w-11/12 mt-5 rounded "
            id="printReciept"
          >
            <div className="row gutters ">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                <div className="w-full p-4">
                  <div className="card-body ">
                    <div className="invoice-container">
                      <div className="invoice-header">
                        {/* Row start */}
                        <div className="row gutters ">
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                            {isLightMode ? (
                              <p
                                className=" fw-bold my-5"
                                style={{ letterSpacing: "2px", color: "black" }}
                              >
                                Token Sell Reciept
                              </p>
                            ) : (
                              <p
                                className="fs-5 fw-bold my-5"
                                style={{ letterSpacing: "2px", color: "white" }}
                              >
                                Token Sell Reciept
                              </p>
                            )}
                            {isLightMode ? (
                              <img className="mx-2" src={darkLogo} alt="logo" />
                            ) : (
                              <img
                                className="mx-2"
                                src={lightlogo}
                                alt="logo"
                              />
                            )}
                            <div
                              className="text-secondary my-3 "
                              style={{ fontSize: "small" }}
                            >
                              {requestData?.SellTokendateTimeField}
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
                        {/* Row end */}
                        {/* Row start */}
                        <div className="row gutters">
                          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                            <div className="invoice-details">
                              <p className="normalTextColor fs-6   ">
                                {requestData?.seller?.username}
                              </p>
                              <p className="text-secondary  mt-1">
                                {requestData?.seller?.email}
                              </p>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                            <div className="invoice-details">
                              {isLightMode ? (
                                <div className="invoice-num">
                                  <div className="normalTe">
                                    <p className="text-dark">Invoice</p>
                                    <p className="text-dark text-sm">
                                      {requestData?._id}
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div className="invoice-num">
                                  <div className="normalTe">
                                    <p className="text-white fs-5">Invoice</p>
                                    <p
                                      className="text-white text-sm"
                                      style={{ fontSize: "small" }}
                                    >
                                      {requestData?._id}
                                    </p>
                                  </div>
                                </div>
                              )}
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
                                    <th className="fs-6  customTableth ">
                                      Bank{" "}
                                    </th>
                                    <th className="fs-6  customTableth">
                                      Token Swapped
                                    </th>
                                    <th className="fs-6  customTableth">Fee</th>
                                    <th className="fs-6  customTableth">
                                      Local Currency
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="p-3 customTabletd">
                                      {requestData?.accountName} <br />
                                      {requestData?.accountNumber}
                                    </td>
                                    <td className="p-3 customTabletd">
                                      {requestData?.Tokens} <span>zkt</span>
                                    </td>
                                    <td className="p-3 customTabletd">
                                      {requestData?.transactionFee}{" "}
                                    </td>
                                    <td className="p-3 customTabletd">
                                      {" "}
                                      {requestData?.localCurrencyAmount}{" "}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
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
                            onClick={handleApprovalClick}
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
          {userData && userData.accounts && userData.accounts.length === 0 && (
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
              <div className="absolute top-[60%] left-[44%] w-full h-fit">
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
    </>
  );
};
export default SellTokensRequest;
