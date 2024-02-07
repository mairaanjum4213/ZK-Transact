import React from 'react';
import BreadCrumb from '../BreadCrumb.tsx';
import '../../css/Registration.css';
import sellTokens from '../../assets/BreadCrumbs/buyZkTokens.png';
import buyToken from '../../assets/sellTokens.png';
import { IoInformationCircle } from "react-icons/io5";
import ZkTokenConversion from '../ZkTokenConversion.tsx';
import { Link } from 'react-router-dom';
const SellTokens: React.FC = () => {
  return (
    <>
      <BreadCrumb
        parentPageLink='/'
        ParentPage='Home'
        pageName='Sell ZK-Tokens'
        ChildPage='Sell ZK Tokens'
        imageUrl={sellTokens}
      />
      <div className=' pt-2 px-5'>
        <div className='row pt-5 pb-5'>
          <div className='col-xl-6 col-lg-6 col-md-6 displayNone centerDiv d-flex justify-content-center align-items-center'>
            <img
              className='RegisterationImage'
              src={buyToken}
              alt='Girl Registering Her Account'
            />
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <p style={{ fontSize: 'x-large', fontWeight: 'bold' }} className=''>
              Sell ZK-Tokens
            </p>
            <input
              className='InputReg mt-4'
              type='text'
              placeholder='Enter Your Meta Mask Wallet Address'
            />
            <input
              className='InputReg mt-4'
              type='text'
              placeholder='Enter ZK-Token Purchaser  User Name'
            />
            <p  ><span className="link-wrapper">
              <Link className="link hover-2 fw-bold " style={{ letterSpacing: "1px" }} to="/zkt-purchasers" > View ZK-Token Purchasers</Link></span></p>
            <input
              className='InputReg mt-4'
              type='text'
              placeholder='Enter Your Local  Bank Account Number '
            />
            <textarea
              className='InputReg mt-4'
              placeholder='Add important comments e.g., Account title'
            ></textarea>
            <div className='mt-4'>
              CurrencyConversion  commented in file:"BuyTokens" to save api free trial
              {/* <ZkTokenConversion /> */}
            </div>
            <div className='mt-4 d-flex align-items-center justify-content-left'
              data-toggle="tooltip" data-placement="top" title="Click on ZK Token Purchaser Name to  view its metamask account "
            >
              <div className=''>
                Enter Contract Hash for transaction of <b>100</b> ZK Tokens to User <u>
                  <Link to="/zkt-purchaser-profile">
                    Faheem
                  </Link>
                </u> meta mask
              </div>
              <div className='mx-1'>
                <IoInformationCircle className="information" />
              </div>
            </div>
            <input
              className='InputReg  recieptChose'
              type='text'
              placeholder='Attach Contract Hash'
            />
            <Link className='my-4 btnStyle' rel="stylesheet" to="/sellTokens-reciept" >
              Generate Reciept
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default SellTokens;
