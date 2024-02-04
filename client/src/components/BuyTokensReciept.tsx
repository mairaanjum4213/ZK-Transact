import BreadCrumb from './BreadCrumb';
import "../css/BuyTokensReciept.css"
import aboutUs from '../assets/BreadCrumbs/buyZkTokens.png';
import lightlogo from "../assets/icon3.png"
import darkLogo from "../assets/icon2.png"
import html2pdf from 'html2pdf.js';
import { useDarkMode, useLightMode } from "color-scheme-hook";
const BuyTokensReciept: React.FC = () => {
    const [isLightMode, toggleColorScheme, resetPreference] = useLightMode();
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
    return (
        <>

        
            <BreadCrumb parentPageLink='/buyTokens' ParentPage="Buy Tokens" pageName="Reciept" ChildPage="Reciept" imageUrl={aboutUs} />
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
                                                <h1 className='fs-3 fw-bold my-5'>Token Purshase Reciept</h1>
                                                {isLightMode ? (
                                                    <img className='mx-2' src={darkLogo} alt="" />
                                                ) : (
                                                    <img className='mx-2' src={lightlogo} alt="" />
                                                )}
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
                                                        faheem_siddiqi@yahoo.com
                                                    </p>
                                                    <p className='text-secondary  mt-1'>
                                                        faheem_siddiqi@yahoo.com
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                                                <div className="invoice-details">
                                                    <div className="invoice-num">
                                                        <div className='normalTe'>Invoice - #009</div>
                                                        <div className='text-secondary ' style={{ fontSize: "small" }}>January 10th 2020</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Row end */}
                                    </div>
                                    <div className="invoice-body">
                                        {/* Row start */}
                                        <div className="row gutters">
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <div className="table-responsive p-3 ">
                                                    <table className="table custom-table     ">
                                                        <thead>
                                                            <tr >
                                                                <th className='fs-5 p-2 customTableth '>User Meta Mask</th>
                                                                <th className='fs-5 p-2 customTableth' >Local Currency</th>
                                                                <th className='fs-5 p-2 customTableth' >Fee</th>
                                                                <th className='fs-5 p-2 customTableth' >Token Purchased</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className='p-3 customTabletd'>
                                                                    0x2f90CDb899A0969Dad61A81CcDFf93fbe81D03Ff
                                                                </td>
                                                                <td className='p-3 customTabletd'> 50000981 pkr</td>
                                                                <td className='p-3 customTabletd'>9% </td>
                                                                <td className='p-3 customTabletd'>$5000.00</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="invoice-footer mt-4">Thank you for chosing ZK-Transact.</div>
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
export default BuyTokensReciept;
