import React from 'react';
import BreadCrumb from './BreadCrumb';
import "../css/TokenTraders.css"
import { IoInformationCircle } from "react-icons/io5";
import '../css/Registration.css';
import buyTokens from '../assets/BreadCrumbs/buyZkTokens.png';
import buyToken from '../assets/buyTokens.png';
import ImportTokens from './ImportTokensAccordian.tsx';
import LocalCurrencyConversion from './LocalCurrencyConversion.tsx';
import { Link } from 'react-router-dom';
const BuyTokens: React.FC = () => {
  return (
    <>
      <BreadCrumb
        parentPageLink='/profile'
        ParentPage='Regional Admin'
        pageName='Buy ZK-Tokens'
        ChildPage='Buy ZK-Tokens'
        imageUrl={buyTokens}
      />
      <div className=' pt-2 px-5'>
        <ImportTokens text="Dont forget to import ZKT in Meta Mask wallet" />
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
              Buy ZK-Tokens
            </p>

            <input
              className='InputReg mt-4'
              type='text'
              placeholder='Enter Your Meta Mask Wallet Address'
            />
            <div className="admin">
              <input
                className='InputReg mt-4'
                type='text'
                placeholder='Enter Seller User Name'
              />
              <p  ><span className="link-wrapper">
                <Link className="link hover-2 fw-bold" to="/zkt-providers" > View ZK-Token Sellers</Link></span></p>
            </div>
            <div className='mt-4'>
              LocalCurrencyConversion  commented in file:"BuyTokens" to save api free trial
              {/* <LocalCurrencyConversion /> */}
            </div>

            <div className='mt-4 d-flex align-items-center justify-content-left'

              data-toggle="tooltip" data-placement="top" title="Click on ZK Token Proview Name to  view local bank account details"
            >
              
              <div className=''>
              Attach a reciept for transaction of <b>100</b> local currency <u>
                  <Link to="/zkt-provider-profile">
                    Faheem
                  </Link>
                </u> local bank
               
              </div>
              <div className='mx-1'>
                <IoInformationCircle className="information" />
              </div>
              






            </div>
            <input
              className='InputReg  recieptChose'
              type='file'
              placeholder='Attach Reciept'
            />




            <Link className='my-4 btnStyle' rel="stylesheet" to="/ buyTokens-reciept" >
              Generate Reciept
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default BuyTokens;
