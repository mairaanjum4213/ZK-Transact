import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdOutlineContentCopy } from "react-icons/md";
import BreadCrumb from "../BreadCrumb.tsx";
import BuyTokens from "../../assets/BreadCrumbs/ZKSellers.jpg";
import Author from "../../assets/author.jpg";
import toast from "react-hot-toast";
import "../../css/TokenTraders.css";
import { useParams } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

interface Props {
  title: string;
}

const ZKtokeProviderProfile: React.FC <Props> = ({title}) => {
  const { username } = useParams<{ username: string }>();
  const [userData, setUserData] = useState<any>(null);
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

  const handleCopyToClipboardUserName = () => {
    toast.success("User Name Copied");
  };
  const handleCopyToClipboardAccount = () => {
    toast.success("Bank Account  Copied");
  };
  const handleCopyToClipboardWalletAddresss = () => {
    toast.success("Wallet Address Copied");
  };
  return (
    <>
     
      <section className="">
        <div className="container py-5 ">
          <h1 className="fw-bold fs-4" style={{ letterSpacing: "1px" }}>
           {title}
          </h1>
          <div className="row d-flex justify-content-center align-items-center mt-5 mx-2 px-1">
            <div className="col col-lg-6 mb-4 mb-lg-0  ">
              <div
                className="adminProfileCard mb-3 "
                style={{ borderRadius: ".5rem" }}
              >
                <div className="row g-0">
                  <div
                    className="col-md-4 gradient-custom text-center text-white d-flex justify-content-center align-items-center flex-column"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <img
                      src={Author}
                      alt="Avatar"
                      className="img-fluid my-4 px-4"
                    />
                    <h5 className=" fs-4">{userData?.fullName} </h5>
                    <p className="text-secondary my-2">{userData?.region}</p>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body px-4 pb-4 pt-lg-4">
                      <p className="fs-4 fw-bold">Profile</p>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-7 mb-3">
                          <h6>Email</h6>
                          <p className="text-secondary">{userData?.email}</p>
                        </div>
                        <div className="col-5 mb-3">
                          <h6>WhatsApp</h6>
                          <p className="text-secondary">{userData?.mobile}</p>
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-7 mb-3">
                          <h6>
                            User Name{" "}
                            <CopyToClipboard
                              onCopy={handleCopyToClipboardUserName}
                              text={userData?.username}
                            >
                              <MdOutlineContentCopy
                                className="text-secondary UsernameCopyicon"
                                style={{ display: "inline" }}
                              />
                            </CopyToClipboard>{" "}
                          </h6>
                          <p className="text-secondary">{userData?.username}</p>
                        </div>
                        <div className="col-5 mb-3">
                          <h6>Fee</h6>
                          <p className="text-secondary">{userData?.merchantFee}% </p>
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-7 mb-3">
                          <h6>Average User Rating </h6>
                          <p className="text-secondary">5/5</p>
                        </div>
                        <div className="col-5 mb-3">
                          <h6>Transactions</h6>
                          <p className="text-secondary">200 </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="fw-bold fs-3 my-3">Available Bank Accounts</h1>
          {userData?.accounts?.map((account: any) => (
            <section className="container mt-2 mb-2">
              <div className="table-responsive container-fluid ">
                <div className="row pt-1">
                  <h1 className="fs-4 fw-bold bankTitle">{account?.accountType}</h1>
                </div>
                <div className="row pt-1">
                  <p className="fs-5 fw-bold mt-2">Account Number</p>
                </div>
                <div className=" container d-flex justify-start-center align-items-center   tableInput">
                  <input
                    type="text"
                    style={{ backgroundColor: "transparent" }}
                    disabled
                    value={account?.accountNumber}
                  />
                  <CopyToClipboard
                    onCopy={handleCopyToClipboardAccount}
                    text={account?.accountNumber}
                  >
                    <MdOutlineContentCopy
                      className="text-secondary fs-5 UsernameCopyicon"
                      style={{ display: "inline" }}
                    />
                  </CopyToClipboard>
                </div>
                <div className="row pt-1">
                  <p className="fs-5 fw-bold mt-2">Comments by Admin</p>
                </div>
                <div className="row pt-1">
                  <p className="fs-6">{`My account title is ${account?.accountName}`}</p>
                </div>
                <hr className="my-5" />
              </div>
            </section>
          ))}


             <h1 className="fw-bold fs-3 my-3">Metamask Account</h1>
             <section className="container mt-2 mb-2">
              <div className="table-responsive container-fluid ">
                <div className="row pt-1">
                  <p className="fs-5 fw-bold mt-2">Metamask Address</p>
                </div>
                <div className=" container d-flex justify-start-center align-items-center   tableInput">
                  <input
                    type="text"
                    style={{ backgroundColor: "transparent" }}
                    disabled
                    value={userData?.wallet?.metamaskAddress}
                  />
                  <CopyToClipboard
                    onCopy={handleCopyToClipboardWalletAddresss }
                    text={userData?.wallet?.metamaskAddress}
                  >
                    <MdOutlineContentCopy
                      className="text-secondary fs-5 UsernameCopyicon"
                      style={{ display: "inline" }}
                    />
                  </CopyToClipboard>
                </div>
              </div>
            </section>
        </div>
     
      </section>
  
    </>
  );
};
export default ZKtokeProviderProfile;
