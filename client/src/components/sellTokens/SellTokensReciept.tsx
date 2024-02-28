
import BreadCrumb from '../BreadCrumb.tsx';
import "../../css/BuyTokensReciept.css"
import aboutUs from '../../assets/BreadCrumbs/buyZkTokens.png';
import lightlogo from "../../assets/icon3.png"
import darkLogo from "../../assets/icon2.png"
import html2pdf from 'html2pdf.js';
import React, { useState, useEffect } from 'react';
import { useLightMode, useDarkMode } from "color-scheme-hook";
import { getSellToken } from '../../helper/helper.tsx'
const SellTokensReciept: React.FC = () => {
    const [isLightMode, toggleColorScheme, resetPreference] = useLightMode();
    const handleDownload = () => {
        const element = document.getElementById('printReciept');
        if (element) {
            const options = {
                margin: 10,
                filename: 'Sell Token Reciept.pdf',
                image: { type: 'jpeg', quality: 1 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
            };
            html2pdf().from(element).set(options).save();
        }
    };
    // Backend Integration
    const [sellTokensRecieptData, setSellTokensReceiptData] = useState<any>("");
    useEffect(() => {
        async function fetchSellToken() {
            try {
                const sellTokenData = await getSellToken('65ddbbc3d039041eb01c2da6');
                console.log(sellTokenData)
                setSellTokensReceiptData(sellTokenData);
            } catch (error) {
                console.error("Error fetching sell token:", error);
            }
        }
        fetchSellToken();
    }, []);
    return (
        <>
            <BreadCrumb parentPageLink='/sellTokens' ParentPage="Sell Tokens" pageName="Reciept" ChildPage="Reciept" imageUrl={aboutUs} />
            <p className="bg-danger">
                There are two reciept aik jisa user dek ka request bja ga dosri admin sa approve hoka jo bna gi
                user can dwonload only approved one doesri ma download waal div urana ha
                <b>  download functionality is working dekna zaror</b>
            </p>
            <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                    <div className="text-right ">
                        <button className="simpleButton1 mt-2 mx-5 px-3" onClick={handleDownload}>
                            Download
                        </button>
                    </div>
                </div>
            </div>
            <div className="container mt-5 mb-3" id='printReciept'>
                <div className="row gutters  ">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "  >
                        <div className="recieptOfPurchasingCard p-4">
                            <div className="card-body ">
                                <div className="invoice-container">
                                    <div className="invoice-header">
                                        {/* Row start */}
                                        <div className="row gutters">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                {isLightMode ? (
                                                    <p className='fs-3 fw-bold my-5' style={{ letterSpacing: '2px', color: "black" }}>Token Sell Reciept</p>
                                                ) : (
                                                    <p className='fs-3 fw-bold my-5' style={{ letterSpacing: '2px', color: "white" }}>Token Sell Reciept</p>
                                                )}
                                                {isLightMode ? (
                                                    <img className='mx-2' src={darkLogo} alt="logo" />
                                                ) : (
                                                    <img className='mx-2' src={lightlogo} alt="logo" />
                                                )}
                                                <div className='text-secondary my-3 ' style={{ fontSize: "small" }}>
                                                    {sellTokensRecieptData.SellTokendateTimeField}
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <p className='normalTextColor text-right fs-6'>
                                                    AdminMaira@yahoo.com
                                                </p>
                                                <p className='text-secondary text-right mt-1'>
                                                    mairaanjum86@gmial.com
                                                </p>
                                                <p className='text-secondary text-right mt-1'>
                                                    Pakistan
                                                </p>
                                            </div>
                                        </div>
                                        {/* Row end */}
                                        {/* Row start */}
                                        <div className="row gutters">
                                            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                                                <div className="invoice-details">
                                                    <p className='normalTextColor fs-6   '>
                                                        {sellTokensRecieptData.seller?.username}
                                                    </p>
                                                    <p className='text-secondary  mt-1'>
                                                        {sellTokensRecieptData.seller?.email}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                                                <div className="invoice-details">

                                                    {isLightMode ? (
                                                        <div className="invoice-num">
                                                            <div className='normalTe'>
                                                                <p className='text-dark'>
                                                                    Invoice
                                                                </p>
                                                                <p className="text-dark" >
                                                                    {sellTokensRecieptData._id}</p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="invoice-num">
                                                            <div className='normalTe'>
                                                                <p className='text-white fs-5'>
                                                                    Invoice
                                                                </p>
                                                                <p className="text-white" style={{ fontSize: "small" }}>
                                                                    {sellTokensRecieptData._id}</p>
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
                                                            <tr >
                                                                <th className='fs-6  customTableth '>Bank </th>
                                                                <th className='fs-6  customTableth' >Token Swapped</th>
                                                                <th className='fs-6  customTableth' >Fee</th>
                                                                <th className='fs-6  customTableth' >Local Currency</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className='p-3 customTabletd'>
                                                                    {sellTokensRecieptData.accountName} <br />
                                                                    {sellTokensRecieptData.accountNumber}
                                                                </td>
                                                                <td className='p-3 customTabletd'>{sellTokensRecieptData.Tokens}  <span>zkt</span></td>
                                                                <td className='p-3 customTabletd'>{sellTokensRecieptData.transactionFee}  </td>
                                                                <td className='p-3 customTabletd'>    {sellTokensRecieptData.localCurrencyAmount} </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {isLightMode ? (
                                        <div className="invoice-footer mt-4 text-dark" >Thank you for chosing ZK-Transact.</div>
                                    ) : (
                                        <div className="invoice-footer mt-4 text-white" >Thank you for chosing ZK-Transact.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" mb-4  text-center ">
                <button className="btnStyle mt-4">
                    Request Reciept Approval
                </button>
            </div>
        </>
    );
};
export default SellTokensReciept;