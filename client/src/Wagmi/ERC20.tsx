import React, { useState, useEffect } from 'react';
import { MdOutlineContentCopy } from "react-icons/md";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useAccount, useBalance, useContractWrite, useContractReads, useWaitForTransaction, usePrepareContractWrite } from 'wagmi';
import { BigNumber } from 'bignumber.js';
import toast, { Toaster } from 'react-hot-toast';
import BreadCrumb from '../components/BreadCrumb';
import Transfer from '../assets/BreadCrumbs/Transfer.png';
import contractABI from './data.json';
import ImportTokens from '../components/ImportTokensAccordian';
import '../css/Registration.css';
export const ERC20: React.FC = () => {
  const [transactionHash, setTransactionHash] = useState('');
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
  const { data: useWaitForTransactionData, isSuccess, isLoading } = useWaitForTransaction({
    hash: useContractWriteData?.hash,
  });

  const handleCopyToClipboardContractHash = () => {
    toast.success('Contract Hash Copied');
};

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
      // ccSuccess
      // window.location.reload();  
      const hash = useContractWriteData?.hash; // Access the contract hash directly
      if (hash) {
        setTransactionHash(hash);
      }
    }
  }, [isSuccess, useContractWriteData]);
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
          Total Balance
          <span className="text-secondary mx-2">{data?.formatted}
            {"ZKT"}
          </span>
          <button className='simpleButton1' onClick={() => { window.location.reload() }}>Refresh Manually for now bad ma jab db connect hojie uncomment by search  <b>ccSuccess </b> </button>

          <p className='' data-toggle="tooltip" data-placement="top" title="contract hash is used for metamask transation confirmation">
           Previous Transaction Contract Hash
          {transactionHash ? (
            <span className='text-secondary mx-2'>
             {transactionHash}
              <CopyToClipboard onCopy={handleCopyToClipboardContractHash} text=  {transactionHash}>
                                    <MdOutlineContentCopy className="mx-2 text-secondary fs-5 UsernameCopyicon" style={{ display: "inline" }} />
                                </CopyToClipboard>
              </span>
          ) : (
            <span className='text-secondary mx-2'>Contract hash not available yet</span>
          )}
        </p>
        
      <p className='bg-danger'>
        <p>
          for confirmation paste contract cash in search bar of link below
        </p>
        https://sepolia.etherscan.io/txs</p>

        <div className='link-wrapper'>
        <p className='mt-2 link hover-2 '>View All Transactions</p>
        </div>
      
        </div>
      </div>
      <div className="row d-flex justify-content-center mt-4 ">
        <input
          style={{ width: "45%" }}
          className="InputReg"
          type="number"
          onChange={handleInputChange1}
          placeholder=" Enter Token Amount"
        />
        <div className="row  d-flex justify-content-center mt-4 ">
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
