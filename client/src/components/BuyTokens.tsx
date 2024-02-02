import React from 'react';
import BreadCrumb from './BreadCrumb';
import '../css/Registration.css';
import { ReactDOM } from 'react';

import aboutUs from '../assets/BreadCrumbs/buyZkTokens.png';
import buyToken from '../assets/buyTokens.png';
import ImportTokens from './ImportTokensAccordian.tsx';
import LocalCurrencyConversion from './LocalCurrencyConversion.tsx';
import { Link } from 'react-router-dom';

const BuyTokens: React.FC = () => {
  return (
    <>
      <BreadCrumb
        parentPageLink='/'
        ParentPage='Regional Admin'
        pageName='Buy ZK-Tokens'
        ChildPage='Buy ZK Tokens'
        imageUrl={aboutUs}
      />
      <div className=' pt-2 px-5'>
       
        <ImportTokens  text="Dont forget to import ZKT in Meta Mask wallet"/>
      
     
        <div className='row pt-5 pb-5'>
          <div className='col-xl-6 col-lg-6 col-md-6 displayNone centerDiv d-flex justify-content-center align-items-center'>
            <img
              style={{ width: '85%' }}
              data-aos='fade-up-right'
              data-aos-offset='5'
              data-aos-easing='ease-in-sine'
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
              className='InputReg mt-5'
              type='text'
              placeholder=' User Name fetch from db'
            />
            <input
              className='InputReg mt-4'
              type='text'
              placeholder=' Enter Meta Mask Wallet Address'
            />

            <div className="admin">
            <input
              className='InputReg mt-4'
              type='text'
              placeholder='Enter Local Admin User Name'
            />
            <Link
            to="/buyTokensd"
              className='text-secondary text-decoration-underline'>
             View Local

            </Link>
            </div>
            <div className='mt-4'>
            LocalCurrencyConversion  commented in file:"BuyTokens" to save api free trial
              {/* <LocalCurrencyConversion /> */}
            </div>
          
            <input
              className='InputReg mt-4'
              type='text'
              placeholder=' Enter Password'
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default BuyTokens;
