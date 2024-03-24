import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { getUser } from "../../helper/helper";
import { BsSignStopFill } from "react-icons/bs";
import lightlogo from "../../assets/icon3.png"
import darkLogo from "../../assets/icon2.png"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdOutlineContentCopy } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { useDarkMode, useLightMode } from "color-scheme-hook";
// wagmi imports 
import ConnectWallet from "../ConnectWallet.tsx";
import {
    useAccount,
    useBalance,
    useContractWrite,
    useContractReads,
    useWaitForTransaction,
    usePrepareContractWrite,
} from "wagmi";
import { BigNumber } from "bignumber.js";
import contractABI from "../../Wagmi/data.json";
import ImportTokens from "../ImportTokensAccordian.tsx";
import { HiOutlineRefresh } from 'react-icons/hi';
const BuyTokensRequest: React.FC = () => {
    const [isLightMode] = useLightMode();
    const [userData, setUserData] = useState<any>();
    const token = localStorage.getItem('token');
    const decodedToken: any = token ? jwtDecode(token) : {};
    const username = decodedToken.username || '';
    const handleCopyToClipboardWalletAddresss = () => {
        toast.success('Wallet Address Copied');
    };
    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await getUser({ username });
                if (response.data) {
                    setUserData(response.data);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchUserData();
    }, [username]);
    const accountsAndwallets = userData && userData.accounts && userData.accounts.length !== 0 && userData.wallet;
    // Transfer Wagmi logic from erc 20
    const [amount, setAmount] = useState<number | string>(0);
    const [address, setAddress] = useState<number | string>("");
    const { address: metamaskaddress } = useAccount();
    const { isConnected } = useAccount();
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
    const {
        data: useWaitForTransactionData,
        isSuccess,
        isLoading,
    } = useWaitForTransaction({
        hash: useContractWriteData?.hash,
    });
    useEffect(() => {
       
    }, [useContractWriteData, useWaitForTransactionData]);
    const { data } = useBalance({
        address: metamaskaddress,
        token: "0x00a8Db0104a6b0C6a3d0a61ADC1Ea8f3b1cd8855",
    });
    const balance = data?.formatted;
    const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const enteredAmount = e.target.value;
        setTransferTokenAmount(enteredAmount);
        // Check if the entered value is a negative number
        if (Number(enteredAmount) < 0) {
            toast.error("Please enter a positive number");
            setAmount(0);
            return;
        }
        if (balance === undefined) {
            toast.loading("Fetching balance...");
            return;
        }
        if (Number(balance) < Number(enteredAmount)) {
            toast.error("Insufficient tokens");
            setAmount(0);
            return;
        }
        const amountInWei = new BigNumber(enteredAmount).times(
            new BigNumber(10).pow(18)
        );
        setAmount(amountInWei.toString(10));
    };
    const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value as number | string);
        setBeneficiaryMetamask(e.target.value);
    };
    useEffect(() => {
        if (isSuccess) {
            toast.success("Transaction Successful");
            window.location.reload();
        }
    }, [isSuccess, useContractWriteData]);
    const [beneficiaryMetamask, setBeneficiaryMetamask] = useState<string>("");
    const [transferTokenAmount, setTransferTokenAmount] = useState<any>();
    const [transferSuccess, setTransferSuccess] = useState(false);
    useEffect(() => {
        if (isSuccess && !transferSuccess) {
            setTransferSuccess(true);
        }
    }, [isSuccess, transferSuccess]);
    const handleTransferClick = () => {
        if (write) {
            write();
        }
    };
    return (
        <>
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div >
                {accountsAndwallets ? (
                    <>
                        <h2 className='mt-5 mx-5 fw-bold'>
                            Buy Tokens Request
                        </h2>
                        <div className="container mt-5 mb-3 w-11/12" id='printReciept'>
                            <div className="row gutters" data-aos="zoom-in-right">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "  >
                                    <div className="recieptOfPurchasingCard p-4">
                                        <div className="card-body ">
                                            <div className="invoice-container">
                                                <div className="invoice-header">
                                                    {/* Row start */}
                                                    <div className="row gutters">
                                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                            <p className='fs-3 fw-bold my-5' style={{ letterSpacing: '2px' }}>Token Purshase Request</p>
                                                            {isLightMode ? (
                                                                <img className='mx-2' src={darkLogo} alt="DarkLogo" />
                                                            ) : (
                                                                <img className='mx-2' src={lightlogo} alt="LightLogo" />
                                                            )}
                                                            <div className='text-secondary mt-4' style={{ fontSize: "small" }}>time stamp</div>
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
                                                                    user name
                                                                </p>
                                                                <p className='text-secondary  mt-1'>
                                                                    email
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                                                            <div className="invoice-details">
                                                                <div className="invoice-num">
                                                                    <div className='normalTe' >
                                                                        <p>
                                                                            Invoice
                                                                        </p>
                                                                        <p>
                                                                            id
                                                                        </p>
                                                                    </div>
                                                                </div>
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
                                                                                metamask address
                                                                                <CopyToClipboard text={"metamaskAddress"} style={{ display: "inline", cursor: '-webkit-grabbing', cursor: 'grabbing' }}>
                                                                                    <MdOutlineContentCopy onClick={handleCopyToClipboardWalletAddresss} className=" UsernameCopyicon mx-2" style={{ display: "inline" }} />
                                                                                </CopyToClipboard>
                                                                            </td>
                                                                            <td className='p-3 customTabletd'> local currency </td>
                                                                            <td className='p-3 customTabletd'>transaction fee % </td>
                                                                            <td className='p-3 customTabletd'>token ammount {" "}zkt</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <div className='link-wrapper'>
                                                                    <p className=" mt-4   hover-2" style={{ cursor: '-webkit-grabbing', cursor: 'grabbing' }}>
                                                                        Show Attached Bank Receipt
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" mb-4  text-center "
                        >
                            <a href="#transfer" className="btnStyle my-4 ">
                                Approve Transaction Request
                            </a>
                        </div>
                        {/* Adding wagmi here to avoid props */}
                        <div className=''>
                            <h2 className="mx-5  fw-bold">
                                Approve Transfer Tokens
                            </h2>
                            <div className='mx-5'>
                                <div className="px-5 mt-5">
                                    <ImportTokens text="Make Sure Recipent have imported ZKT" />
                                    <div className="flex align-items-center justify-between mb-4" >
                                        <div className=" fw-bold" style={{ fontSize: "xx-large" }}>
                                            Transfer {data?.symbol}
                                        </div>
                                        <ConnectWallet />
                                    </div>
                                    <div className="" style={{ fontSize: "large" }}>
                                        Total Balance
                                        <span className="text-secondary mx-2">
                                            {data?.formatted}
                                            {"ZKT"}
                                        </span>
                                    </div>
                                </div>
                                <form
                                    className="row d-flex justify-content-center mt-4"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                    }}
                                >
                                    <input
                                        style={{ width: "65%" }}
                                        id="transfer"
                                        className="InputReg cursor-auto"
                                        type="number"
                                        onChange={handleInputChange1}
                                        value={transferTokenAmount}
                                        placeholder="replace transferTokenAmount var with db value thhis input is disbale"
                                    />
                                    <div className="row  d-flex justify-content-center mt-4 ">
                                        <input
                                            className="InputReg cursor-auto"
                                            style={{ width: "65%" }}
                                            type="text"
                                            onChange={handleInputChange2}
                                            placeholder="replace  var with db value  jsa uper show krwie reciept ma thhis input is disbale"
                                            value={beneficiaryMetamask}
                                        />
                                    </div>
                                    <div className="row d-flex justify-content-center mt-5  mb-5 ">
                                        <button
                                            style={{ minWidth: "45%" }}
                                            className="btnStyle "
                                            disabled={!write || amount == 0}
                                            onClick={handleTransferClick}
                                        >
                                            Transfer
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {userData && userData.accounts && userData.accounts.length === 0 && (
                            <>
                                <div className='absolute top-1/2 left-[44%] w-full h-fit -z-10'>
                                    <div className='flex align-items-center gap-2'>
                                        <BsSignStopFill className="text-red-800 w-10 h-10" />
                                        <p className='text-xl  tracking-wider'>Add Local Bank Account to Provide Services</p>
                                    </div>
                                </div>
                            </>
                        )}
                        {/* Check if wallet is empty */}
                        {!userData || !userData.wallet && (
                            <div className='absolute top-[60%] left-[44%] w-full h-fit -z-10 '>
                                <div className='flex align-items-center gap-2'>
                                    <BsSignStopFill className="text-red-800 w-10 h-10" />
                                    <p className='text-xl  tracking-wider'>Add Meta Mask to Provide Services</p>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
            <div>
            </div>
        </>
    );
};
export default BuyTokensRequest;
