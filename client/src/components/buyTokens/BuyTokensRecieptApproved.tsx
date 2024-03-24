import BreadCrumb from '../BreadCrumb.tsx';
import "../../css/BuyTokensReciept.css"
import aboutUs from '../../assets/BreadCrumbs/buyZkTokens.png';
import lightlogo from "../../assets/icon3.png"
import darkLogo from "../../assets/icon2.png"
import html2pdf from 'html2pdf.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdOutlineContentCopy } from "react-icons/md";
import toast from 'react-hot-toast';
import { useDarkMode, useLightMode } from "color-scheme-hook";
import axios from 'axios'
import { useEffect, useState } from 'react';
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

const BuyTokensRecieptApproved: React.FC = () => {

    const [isLightMode, toggleColorScheme, resetPreference] = useLightMode();
    const [allImage, setAllImage] = useState<any>(null);
    const [pdfFile, setPdfFile] = useState<string | null>(null);


    const handleCopyToClipboardWalletAddresss = () => {
        toast.success('Wallet Address Copied');
    };


    const handleDownload = () => {
        const element = document.getElementById('printReciept');
        if (element) {
            const options = {
                margin: 10,
                filename: 'Buy Token Reciept.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
            };
            html2pdf().from(element).set(options).save();
        }
    };

    useEffect(() => {
        fetchBuyToken();
    }, []);

    const fetchBuyToken = async () => {
        try {
            const result = await axios.get(
                '/api/getbuytokens'
            );
            setAllImage(result.data);
        } catch (error) {
        }
    };

    const showreceipt = (receipt: string) => {
        window.open(`http://localhost:8080/uploads/${receipt}`);
    };
    return (
        <>
            <BreadCrumb parentPageLink='/buyTokens' ParentPage="Buy Tokens" pageName="Reciept" ChildPage="Reciept" imageUrl={aboutUs} />
            <div className="row gutters ">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                    <div className="text-right ">
                        <button className="simpleButton1 mt-4 mx-5 px-3" onClick={handleDownload}>
                            Download
                        </button>
                    </div>
                </div>
            </div>
            <div className="container mt-5 mb-5" id='printReciept'>
                <div className="row gutters  ">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "  >
                        <div className="recieptOfPurchasingCard p-4">
                            <div className="card-body ">
                                <div className="invoice-container">
                                    <div className="invoice-header">
                                        <div className="row gutters">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">

                                                {isLightMode ? (
                                                    <p className='fs-3 fw-bold my-5 text-dark' style={{ letterSpacing: '2px' }}>Token Purshase Request</p>
                                                ) : (
                                                    <p className='fs-3 fw-bold my-5 text-light' style={{ letterSpacing: '2px' }}>Token Purshase Request</p>
                                                )}

                                                {isLightMode ? (
                                                    <img className='mx-2' src={darkLogo} alt="" />
                                                ) : (
                                                    <img className='mx-2' src={lightlogo} alt="" />
                                                )}

                                                <div className='text-secondary mt-4' style={{ fontSize: "small" }}>{allImage?.dateTimeField}</div>
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

                                        <div className="row gutters">
                                            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                                                <div className="invoice-details">
                                                    <p className='normalTextColor fs-6   '>
                                                        {allImage?.buyer?.username}
                                                    </p>
                                                    <p className='text-secondary  mt-1'>
                                                        {allImage?.buyer?.email}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                                                <div className="invoice-details">

                                                    {isLightMode ? (

                                                        <div className="invoice-num">
                                                            <div className='normalTe' >
                                                                <p className='text-dark'>
                                                                    Invoice
                                                                </p>
                                                                <p className='text-dark'>
                                                                    {allImage?._id}
                                                                </p>
                                                            </div>
                                                        </div>

                                                    ) : (
                                                        <div className="invoice-num">
                                                            <div className='normalTe' >
                                                                <p className='text-white'>
                                                                    Invoice
                                                                </p>
                                                                <p className='text-white'>
                                                                    {allImage?._id}
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
                                                            <tr >
                                                                <th className='fs-6 customTableth '>User Meta Mask</th>
                                                                <th className='fs-6 customTableth' >Local Currency</th>
                                                                <th className='fs-6 customTableth' >Fee</th>
                                                                <th className='fs-6 customTableth' >Token Purchased</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className='p-3 customTabletd'>
                                                                    {allImage?.metamaskAddress}

                                                                    <CopyToClipboard text={allImage?.metamaskAddress}>
                                                                        <MdOutlineContentCopy onClick={handleCopyToClipboardWalletAddresss} className=" UsernameCopyicon mx-2" style={{ display: "inline" }} />
                                                                    </CopyToClipboard>
                                                                </td>
                                                                <td className='p-3 customTabletd'> {allImage?.localCurrency} </td>
                                                                <td className='p-3 customTabletd'>{allImage?.transactionFee}% </td>
                                                                <td className='p-3 customTabletd'>{allImage?.TokensAmount} {" "}zkt</td>
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


        </>
    );
};
export default BuyTokensRecieptApproved;
