import React, { useState,useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { IoInformationCircle } from 'react-icons/io5';
import BreadCrumb from '../BreadCrumb.tsx';
import ImportTokens from '../ImportTokensAccordian.tsx';
import LocalCurrencyConversion from '../LocalCurrencyConversion.tsx';
import buyTokens from '../../assets/buyTokens.png';
import buyToken from '../../assets/BreadCrumbs/buyZkTokens.png';
import '../../css/Registration.css';
import '../../css/TokenTraders.css';

import toast, { Toaster } from 'react-hot-toast';
import { storebuyToken } from '../../helper/helper';
import { useFormik } from 'formik';

// FOr user data
import { jwtDecode } from "jwt-decode";
import { getUser } from "../../helper/helper"

const BuyTokens: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken: any = token ? jwtDecode(token) : {};
  const username = decodedToken.username || '';
  const [userData, setUserData] = useState<string>("");

// -----User Data
useEffect(() => {
  // Fetching User Data for Id
  async function fetchUserData() {
    try {
      const response = await getUser({ username });
      if (response.data) {
        setUserData(response.data)
        // To Access Id or other data of user from db just use userData._id
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  fetchUserData();
}, [username]);

  const [metamask, setMetamask] = useState<string>("");
  const [serviceProvider, setServiceProvider] = useState<string>("");
  const [localCurrencyVal, setLocalCurrencyVal] = useState<number>();
  const [transactionfee, settransactionfee] = useState<number>();
  const [zkTokenVal, setZkTokenVal] = useState<number>();
  const [userInputLocalVal, setUserInputLocalVal] = useState<number>(0);


  const handleDataUpdate = (
    localCurrencyVal: number,
    zkTokenVal: number,
    userInputLocalVal: number,
    transactionFee: number
  ) => {
    setLocalCurrencyVal(localCurrencyVal);
    setZkTokenVal(zkTokenVal);
    setUserInputLocalVal(userInputLocalVal);
    settransactionfee(transactionFee);
  };

  const formik = useFormik({
    initialValues: {
      // No need to provide initial values here
    },
    onSubmit: async () => {
      try {
        const values = {
          buyer:userData._id,
          metamaskAddress: metamask,
          serviceProviderName: serviceProvider,
          localCurrency: localCurrencyVal || 0,
          TokensAmount: zkTokenVal || 0,
          transactionFee: transactionfee || 0,
        };
  
        const storebuyTokenPromise = storebuyToken(values);
        toast.promise(storebuyTokenPromise, {
          loading: 'Creating...',
          success: <b>Buy Tokens request sent Successfully...!</b>,
          error: <b>Error occurs while buying tokens.</b>
        });
        storebuyTokenPromise.then(() => navigate('/login'));
      } catch (error) {
        console.error("Error submitting buy token data:", error);
        toast.error("Error submitting buy token data. Please try again later.");
      }
    }
  });
   
  return (
    <>
    <Toaster position='top-center' reverseOrder={false}></Toaster>
      <BreadCrumb
        parentPageLink='/user'
        ParentPage='Home'
        pageName='Buy ZK-Tokens'
        ChildPage='Buy ZK-Tokens'
        imageUrl={buyToken}
      />
      <div className='pt-2 px-5'>
        <ImportTokens text="Dont forget to import ZKT in Meta Mask wallet" />
        <div className='row pt-5 pb-5'>
          <div className='col-xl-6 col-lg-6 col-md-6 displayNone centerDiv d-flex justify-content-center align-items-center'>
            <img
              className='RegisterationImage'
              src={buyTokens}
              alt='Girl Registering Her Account'
            />
          </div>

          <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <p style={{ fontSize: 'x-large', fontWeight: 'bold', letterSpacing: "2px" }} className=''>
              Buy ZK-Tokens
            </p>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data" method="POST" action="/buyToken">
              <input
                className='InputReg mt-4'
                type='text'
                placeholder='Enter Your Meta Mask Wallet Address'
                value={metamask || ''}
                onChange={(e) => setMetamask(String((e.target as HTMLInputElement).value))}
                required
              />
              <div className="admin">
                <input
                  className='InputReg mt-4'
                  type='text'
                  placeholder='Enter Seller User Name'
                  value={serviceProvider || ''}
                  onChange={(e) => setServiceProvider(String((e.target as HTMLInputElement).value))}
                  required
                />
                <p  ><span className="link-wrapper">
                  <Link className="link hover-2 fw-bold" style={{ letterSpacing: "1px" }} to="/zkt-providers" > View ZK-Token Sellers</Link></span></p>
              </div>
              <div className='mt-4'>
                LocalCurrencyConversion  commented in file:"BuyTokens" to save api free trial

                <LocalCurrencyConversion onDataUpdate={handleDataUpdate} />
              </div>
              <div className='mt-4 d-flex align-items-center justify-content-left'
                data-toggle="tooltip" data-placement="top" title="Click on ZK Token Seller Name to  view local bank account details"
              >
                <div className=''>
                  Attach bank reciept for transaction of <b>100</b> local currency <u>
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
                name= 'buyReceipt'
              />
              <button type='submit' className='my-4 btnStyle' rel="stylesheet"> Generate Reciept
            </button>
               
            </form>

          </div>
        </div>

      </div>

      
    </>
  );
};
export default BuyTokens;
