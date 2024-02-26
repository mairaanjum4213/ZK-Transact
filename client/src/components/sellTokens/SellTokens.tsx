import React, { useState, useEffect } from 'react';
import BreadCrumb from '../BreadCrumb.tsx';
import '../../css/Registration.css';
import ZkTokenConversion from '../ZkTokenConversion.tsx';
import { IoInformationCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import sellTokens from '../../assets/BreadCrumbs/buyZkTokens.png';
import buyToken from '../../assets/sellTokens.png';
// Backend integration
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { registerValidation } from "../../helper/validate";
import { jwtDecode } from "jwt-decode";
import { getUser, sellToken } from "../../helper/helper"




const SellTokens: React.FC = () => {
  const token = localStorage.getItem('token');
  const decodedToken: any = token ? jwtDecode(token) : {};
  const username = decodedToken.username || '';
  const [userData, setUserData] = useState<string>("");
  const formik = useFormik({
    initialValues: {
      sellerMetamask: '',
      accountNumber: '',
      accountComments: '',
      accountName: '',
      localCurrencyAmount: '',
      transactionFee: '',
      contractHash:'',
      token: '',
      
    },
    validate: registerValidation,
    onSubmit: async (values: any) => {
      alert("Not SHOWING YYYYYYYYYYYYYYYYYYYYYYYYY")
      console.log("NOT SHOWING YYYYYYYYYYYYYYYYYYYYYYYYY")
      try {
        // Make the post request
        let postPromise = sellToken(values);
        // Use toast.promise to handle the asynchronous promise
        toast.promise(postPromise, {
          loading: 'Sending Request..',
          success: <b>Request Sent!</b>,
          error: <b>Couldn't post at this moment.</b>
        });
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred while posting data.');
      }
    }
  });
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



  
  const [localCurrencyVal, setLocalCurrencyVal] = useState<number>();
  const [transactionfee, settransactionfee] = useState<number>();
  const [inputZKToken, setInputZKToken] = useState<number>();
  const [userInputLocalVal, setUserInputLocalVal] = useState<number>(0);

  const handleDataUpdate = (
    localCurrencyVal: number,
    inputZKToken: number,
    transactionFee: number
  ) => {
    setLocalCurrencyVal(localCurrencyVal);
    setInputZKToken(inputZKToken);
    settransactionfee(transactionFee);
  };

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
            <form onSubmit={formik.handleSubmit} >
              <p style={{ fontSize: 'x-large', fontWeight: 'bold' }} className=''>
                Sell ZK-Tokens
              </p>

              <input
                required
                {...formik.getFieldProps('sellerMetamask')}
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
                {...formik.getFieldProps('accountNumber')}
                className='InputReg mt-4'
                style={{ width: "60%", borderRadius: "0px" }}
                type='text'
                placeholder='Enter Your Local  Bank Account Number '
              />
              <select
                className="InputReg  border border-secondary"
                style={{ width: "40%", borderRadius: "0px" }}>
                <option>Select Bank Name</option>
                <option value="jazz_cash">Jazz Cash</option>
                <option value="easy_paisa">Easy Paisa</option>
                <option value="hbl">HBL</option>
              </select>
              <textarea
                {...formik.getFieldProps('accountComments')}
                className='InputReg mt-4'
                placeholder='Add important comments e.g., Account title'
              ></textarea>
              <div className='mt-4'>
                CurrencyConversion  commented in file:"BuyTokens" to save api free trial
                <ZkTokenConversion onDataUpdate={handleDataUpdate} />
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
                {...formik.getFieldProps('contractHash')}
                className='InputReg  recieptChose'
                type='text'
                placeholder='Attach Contract Hash'
              />
              <button type='submit' className='my-4 btnStyle' rel="stylesheet"  >
                Generate Reciept
              </button>
            </form>
          </div>
        </div>
      </div>
      <p className='bg-danger mx-5'>{userData._id}   - - - user id from db faheem_siddiqi </p>
    </>
  );
};
export default SellTokens;
