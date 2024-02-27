
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
import { jwtDecode } from "jwt-decode";
import { getUser, storesSellToken } from "../../helper/helper"


const SellTokens: React.FC = () => {
  const token = localStorage.getItem('token');
  const decodedToken: any = token ? jwtDecode(token) : {};
  const username = decodedToken.username || '';
  const [userData, setUserData] = useState<string>("");
  const [sellerMetamask, setSellerMetamask] = useState<string>('');
  const [purchaserName, setPurchaserName] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [accountName, setAccountName] = useState<string>('');
  const [accountComments, setAccountComments] = useState<string>('');
  const [contractHash, setContractHash] = useState<string>('');
  // From ZK Token Conversion
  const [localCurrencyVal, setLocalCurrencyVal] = useState<number>();
  const [transactionfee, settransactionfee] = useState<number>();
  const [inputZKToken, setInputZKToken] = useState<number>();
 // Fetching User Data for Id
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await getUser({ username });
        if (response.data) {
         // To Access Id or other data of user from db just use userData._id
          setUserData(response.data)
        
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, [username]);
  const handleDataUpdate = (
    roundedNum: number,
    inputZKToken: number,
    transactionFee: number
  ) => {
    setLocalCurrencyVal(roundedNum);
    setInputZKToken(inputZKToken);
    settransactionfee(transactionFee);
  };
  const formik = useFormik({
    initialValues: {
      // No need to provide initial values here
    },
    onSubmit: async () => {
      try {
        const values = {
          seller: userData._id,
          sellerMetamask: sellerMetamask,
          purchaserName:purchaserName,
          accountNumber: accountNumber,
          accountComments: accountComments,
          accountName: accountName,
          contractHash: contractHash,
          localCurrencyAmount: localCurrencyVal || 0,
          transactionFee: transactionfee || 0,
          Tokens: inputZKToken || 0,
        };
        const storeSellTokenPromise = storesSellToken(values);
        toast.promise(storeSellTokenPromise, {
          loading: 'Creating...',
          success: <b>Sell Tokens request sent Successfully</b>,
          error: <b>Error Occured While Sending Request</b>
        });
        storeSellTokenPromise.then(() => window.location.reload());
      } catch (error) {
        console.error("Error submitting Selling Token Data:", error);
        toast.error("Error Occured While Submitting Sell Token Data");
      }
    }
  });
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
                className='InputReg mt-4'
                type='text'
                placeholder='Enter Your Meta Mask Wallet Address'
                value={sellerMetamask || ''}
                onChange={(e) => setSellerMetamask(String((e.target as HTMLInputElement).value))}
              />
              <input
              required
                className='InputReg mt-4'
                type='text'
                placeholder='Enter ZK-Token Purchaser User Name'
                value={purchaserName || ''}
                onChange={(e) => setPurchaserName(String((e.target as HTMLInputElement).value))}
              />
              <p>
                <span className="link-wrapper">
                  <Link className="link hover-2 fw-bold " style={{ letterSpacing: "1px" }} to="/zkt-purchasers" > View ZK-Token Purchasers</Link>
                </span>
              </p>
              <input
              required
                className='InputReg mt-4'
                style={{ width: "60%", borderRadius: "0px" }}
                type='text'
                placeholder='Enter Your Local  Bank Account Number '
                value={accountNumber || ''}
                onChange={(e) => setAccountNumber(String((e.target as HTMLInputElement).value))}
              />
              <select
              required
                className="InputReg border border-secondary"
                style={{ width: "40%", borderRadius: "0px" }}
                value={accountName || ''}
                onChange={(e) => setAccountName(e.target.value)}
              >
                <option>Select Bank Name</option>
                <option value="jazz_cash">Jazz Cash</option>
                <option value="easy_paisa">Easy Paisa</option>
                <option value="hbl">HBL</option>
              </select>
              <textarea
              required
                className='InputReg mt-4'
                placeholder='Add important comments e.g., Account title'
                value={accountComments || ''}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAccountComments(e.target.value)}
              >
              </textarea>
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
                className='InputReg recieptChose'
                required
                type='text'
                value={contractHash || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContractHash(e.target.value)}
                placeholder='Attach Contract Hash'
              />
              <button type='submit' className='my-4 btnStyle' rel="stylesheet"  >
                Generate Reciept
              </button>
            </form>
          </div>
        </div>
      </div>
      <p className='bg-danger mx-5'>{localCurrencyVal}   - - - user id from db faheem_siddiqi </p>
    </>
  );
};
export default SellTokens;
