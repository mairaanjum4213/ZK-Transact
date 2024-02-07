import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdOutlineContentCopy } from 'react-icons/md';
import BreadCrumb from '../BreadCrumb.tsx';
import BuyTokens from '../../assets/BreadCrumbs/ZKSellers.jpg';
import Author from '../../assets/author.jpg';
import toast from 'react-hot-toast';
import '../../css/TokenTraders.css';

const ZKtokePurchaserProfile: React.FC = () => {
    const handleCopyToClipboardUserName = () => {
        toast.success('User Name Copied');
    };

    const handleCopyToClipboardAccount = () => {
        toast.success('Bank Account  Copied');
    };
    const handleCopyToClipboardWalletAddresss = () => {
        toast.success('Wallet Address Copied');
    };
    return (
        <>
            <BreadCrumb parentPageLink='/sellTokens' ParentPage="Sell Tokens" pageName=" ZK-Token Purchaser" ChildPage=" ZK-Token Purchaser" imageUrl={BuyTokens} />
            <section className="">
                <div className="container py-5 ">
                    <h1 className="fw-bold fs-4" style={{ letterSpacing: "1px" }}>ZK Token Purchaser Profile</h1>
                    <div className="row d-flex justify-content-center align-items-center mt-5 ">
                        <div className="col col-lg-6 mb-4 mb-lg-0  ">
                            <div className="adminProfileCard mb-3 " style={{ borderRadius: ".5rem" }}>
                                <div className="row g-0">
                                    <div
                                        className="col-md-4 gradient-custom text-center text-white d-flex justify-content-center align-items-center flex-column"
                                        style={{
                                            borderTopLeftRadius: ".5rem",
                                            borderBottomLeftRadius: ".5rem"
                                        }}
                                    >
                                        <img
                                            src={Author}
                                            alt="Avatar"
                                            className="img-fluid my-4"
                                            style={{ width: "80%" }}
                                        />
                                        <h5 className=" fs-4">Faheem Siddiqi </h5>
                                        <p className="text-secondary my-2">Pakistan</p>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body px-4 pb-4 pt-lg-4">
                                            <p className="fs-4 fw-bold">Profile</p>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-7 mb-3">
                                                    <h6>Email</h6>
                                                    <p className="text-secondary">mairaanjum86@gmail.com</p>
                                                </div>
                                                <div className="col-5 mb-3">
                                                    <h6>WhatsApp</h6>
                                                    <p className="text-secondary">+923167104541 </p>
                                                </div>
                                            </div>
                                            <div className="row pt-1">
                                                <div className="col-7 mb-3">
                                                    <h6>User Name    <CopyToClipboard onCopy={handleCopyToClipboardUserName} text={"add user name varaible"}>
                                                        <MdOutlineContentCopy className="text-secondary UsernameCopyicon" style={{ display: "inline" }} />
                                                    </CopyToClipboard>   </h6>
                                                    <p className="text-secondary">faheem_siddiqi</p>
                                                </div>
                                                <div className="col-5 mb-3">
                                                    <h6>Fee</h6>
                                                    <p className="text-secondary">2% </p>
                                                </div>
                                            </div>
                                            <div className="row pt-1">
                                                <div className="col-7 mb-3">
                                                    <h6>Average User Rating    </h6>
                                                    <p className="text-secondary">5/5</p>
                                                </div>
                                                <div className="col-5 mb-3">
                                                    <h6>Transactions</h6>
                                                    <p className="text-secondary">200 </p>
                                                </div>
                                            </div>
                                            <div className="row pt-1">
                                                <div className="col-12 mb-3">
                                                    <h6>Meta Mask Wallet Address</h6>
                                                    <input className="bg-transparent outline-0 w-100 text-secondary py-2" type="text" value={"ccdsdesfdsfdsesfdsfdsesfdsfdsesfdsfdsesfdsfdsesfdsfdsdfdccdsdesfdsfdsesfdsfdsesfdsfdsesfdsfdsesfdsfdsesfdsfdsdfd"} />
                                                    <CopyToClipboard onCopy={handleCopyToClipboardWalletAddresss} text={"add wallet address"}>
                                                        <p className="text-secondary UsernameCopyicon" >Copy Address</p>
                                                    </CopyToClipboard>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* To be deleted when making dynamic */}
                </div>
            </section>
        </>
    );
};
export default ZKtokePurchaserProfile;
