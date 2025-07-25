import BreadCrumb from "../BreadCrumb.tsx";
import "../../css/BuyTokensReciept.css";
import aboutUs from "../../assets/BreadCrumbs/buyZkTokens.png";
import lightlogo from "../../assets/icon3.png";
import darkLogo from "../../assets/icon2.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdOutlineContentCopy } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { useDarkMode, useLightMode } from "color-scheme-hook";
import axios from "axios";
import { useEffect, useState } from "react";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;
import { useNavigate, useParams } from "react-router-dom";

const BuyTokensReciept: React.FC = () => {
  const [isLightMode, toggleColorScheme, resetPreference] = useLightMode();
  const [allImage, setAllImage] = useState<any>(null);
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const { username } = useParams<{ username: string }>();
  const [userData, setUserData] = useState<any>(null);
  const navigate= useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/user/${username}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [username]);

  const handleCopyToClipboardWalletAddresss = () => {
    toast.success("Wallet Address Copied");
  };

  useEffect(() => {
    fetchBuyToken();
  }, []);

  const fetchBuyToken = async () => {
    try {
      const result = await axios.get("/api/getbuytokens");
      setAllImage(result.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const showreceipt = (receipt: string) => {
    window.open(`http://localhost:8080/uploads/${receipt}`);
  };

  const handleApproveBuyToken = async (id:any) => {
    try {
      const response = await axios.put(`/api/buyToken/approve/${id}`);
      toast.success('Buy token request sent successfully to admin');
      navigate('/buyTokens-approval');

    } catch (error) {
      toast.error('Error sending buy token request');
    }
  };

  const handleButtonClick = () => {
    const buyTokenRequestId = allImage?._id;
    handleApproveBuyToken(buyTokenRequestId);
  };
  
  return (
    <>
     <Toaster position='top-center' reverseOrder={false}></Toaster>
      <BreadCrumb
        parentPageLink="/buyTokens"
        ParentPage="Buy Tokens"
        pageName="Reciept"
        ChildPage="Reciept"
        imageUrl={aboutUs}
      />

      <div className="container mt-5 mb-3" id="printReciept">
        <div className="row gutters" data-aos="zoom-in-right">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
            <div className="recieptOfPurchasingCard p-4">
              <div className="card-body ">
                <div className="invoice-container">
                  <div className="invoice-header">
                    {/* Row start */}
                    <div className="row gutters">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                        <p
                          className="fs-3 fw-bold my-5"
                          style={{ letterSpacing: "2px" }}
                        >
                          Token Purshase Request
                        </p>
                        {isLightMode ? (
                          <img className="mx-2" src={darkLogo} alt="DarkLogo" />
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
                          {allImage?.dateTimeField}
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
                            {allImage?.buyer?.username}
                          </p>
                          <p className="text-secondary  mt-1">
                            {allImage?.buyer?.email}
                          </p>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                        <div className="invoice-details">
                          <div className="invoice-num">
                            <div className="normalTe">
                              <p>Invoice</p>

                              <p>{allImage?._id}</p>
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
                                <th className="fs-6 customTableth">Fee</th>
                                <th className="fs-6 customTableth">
                                  Token Purchased
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="p-3 customTabletd">
                                  {allImage?.metamaskAddress}
                                  <CopyToClipboard
                                    text={allImage?.metamaskAddress}
                                    style={{
                                      display: "inline",
                                      cursor: "-webkit-grabbing",
                                      cursor: "grabbing",
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
                                  {allImage?.localCurrency}{" "}
                                </td>
                                <td className="p-3 customTabletd">
                                  {allImage?.transactionFee}%{" "}
                                </td>
                                <td className="p-3 customTabletd">
                                  {allImage?.TokensAmount} zkt
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <div className="link-wrapper">
                            <p
                              className=" mt-4   hover-2"
                              onClick={() => showreceipt(allImage?.buyReceipt)}
                              style={{
                                cursor: "-webkit-grabbing",
                                cursor: "grabbing",
                              }}
                            >
                              Show Attached Bank Receipt
                            </p>
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
      </div>
      <div className=" mb-4  text-center ">
        <button className="btnStyle mt-4" onClick={handleButtonClick}>Approve Transaction Request</button>
      </div>

      <div>
        <p>{}</p>
      </div>
    </>
  );
};
export default BuyTokensReciept;
