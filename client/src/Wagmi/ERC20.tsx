import React, { useState, useEffect } from 'react';
import { useAccount, useBalance, useContractWrite, useContractReads, useWaitForTransaction, usePrepareContractWrite } from 'wagmi';
import { BigNumber } from 'bignumber.js';
import toast, { Toaster } from 'react-hot-toast';
import BreadCrumb from '../components/BreadCrumb';
import Transfer from '../assets/BreadCrumbs/Transfer.png';
import contractABI from './data.json';
import ImportTokens from '../components/ImportTokensAccordian';
import '../css/Registration.css';
export const ERC20: React.FC = () => {
  const [amount, setAmount] = useState<number | string>(0);
  const [address, setAddress] = useState<number | string>("");
  const { address: metamaskaddress } = useAccount();
  const wagmigotchiContract = {
    address: import.meta.env.VITE_SMART_ADD2,
    abi: [...contractABI.abi] as any,
  } as const;
  const { data: useContractReadsData } = useContractReads({
    contracts: [{ ...wagmigotchiContract, functionName: "name" }],
  });
  const value = useContractReadsData?.[0].result;
  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_SMART_ADD2,
    abi: contractABI.abi,
    functionName: "transfer",
    args: [address, amount],
  });
  const { data: useContractWriteData, write } = useContractWrite(config);
  const { data: useWaitForTransactionData, isSuccess } = useWaitForTransaction({
    hash: useContractWriteData?.hash,
  });
  useEffect(() => {
    console.log("_________________________");
    console.log("UseContractWriteData", useContractWriteData);
    console.log("UseWaitfortransaction9", useWaitForTransactionData);
    console.log("________________________");
  }, [useContractWriteData, useWaitForTransactionData]);
  const { data } = useBalance({
    address: metamaskaddress,
    token: "0x00a8Db0104a6b0C6a3d0a61ADC1Ea8f3b1cd8855",
  });
  const balance = data?.formatted;
  const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredAmount = e.target.value as string;
    // Check if the entered value is a negative number
    if (Number(enteredAmount) < 0) {
      toast.error('Please enter a positive number');
      setAmount(0);
      return;
    }
    if (balance === undefined) {
      toast.loading('Fetching balance...');
      return;
    }
    if (Number(balance) < Number(enteredAmount)) {
      toast.error('Insufficient tokens');
      setAmount(0);
      return;
    }
    const amountInWei = new BigNumber(enteredAmount).times(new BigNumber(10).pow(18));
    setAmount(amountInWei.toString(10));
  };
  const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value as number | string);
  };
  useEffect(() => {
    if (isSuccess) {
      // Perform actions for a successful transaction
      toast.success('Transaction Successful');
      window.location.reload(); // Refresh the page
    }
  }, [isSuccess]);
  return (
    <>
      <BreadCrumb parentPageLink="/" ParentPage="Home" pageName="Transfer ZKT  " ChildPage="Transffer ZKT" imageUrl={Transfer} />
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="px-5 mt-5">
        <ImportTokens text="Make Sure Recipent have imported ZKT" />
        <div className=" fw-bold" style={{ fontSize: "xx-large" }}>
          Transfer {data?.symbol}
        </div>
        <div className="" style={{ fontSize: "large" }}>
          Total Balance<span className="text-secondary mx-2">{data?.formatted} {"ZKT"}  </span>
        </div>
      </div>
      <div className="row d-flex justify-content-center mt-5 ">
        <input
          style={{ width: "45%" }}
          className="InputReg"
          type="number"
          onChange={handleInputChange1}
          placeholder=" Enter Token Amount"
        />
        <div className="row  d-flex justify-content-center mt-5 ">
          <input
            className="InputReg"
            style={{ width: "45%" }}
            type="text"
            onChange={handleInputChange2}
            placeholder=" Enter Recipient Wallet Address"
          />
        </div>
      </div>
      <div className="row d-flex justify-content-center mt-5  mb-5 ">
        <button style={{ minWidth: "45%" }} className="btnStyle " disabled={!write || amount == 0} onClick={write}>
          Transfer
        </button>
      </div>
    </>
  );
};
