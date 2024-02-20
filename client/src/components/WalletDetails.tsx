import "../css/WalletDetails.css"
import BreadCrumb from './BreadCrumb';
import breadCrumWallet from "../assets/BreadCrumbs/ImportTokens.png"
import { HiOutlineRefresh } from "react-icons/hi";
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdOutlineContentCopy } from "react-icons/md";
import toast from 'react-hot-toast';
import { useNetwork, useSwitchNetwork } from 'wagmi'
import { useBlockNumber } from 'wagmi'
import { useAccount, useEnsName, useBalance } from 'wagmi'
import React from 'react';
import metamask from "../assets/metamask.png"
const WalletDetails: React.FC = () => {
  const handleCopyToClipboardWalletAddresss = () => {
    toast.success('Wallet Address Copied');
  };
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { data } = useBlockNumber({ watch: true })
  const { data: balance, refetch } = useBalance({
    address,
    watch: true,
  })
  const [walletAddress, setWalletAddress] = useState("SetUseState");
  useEffect(() => {
    { ensName ?? address }
    { ensName ? ` (${address})` : null }
    const updatedAddress = address ?? 'Default Address';
    setWalletAddress(updatedAddress);
  }, [address])
  const handleNetworkSwitch = async (id: number, name: string) => {
    try {
      if (switchNetwork) {
        await switchNetwork(id);
        toast.success(`Switching to ${name}`);
      }
    } catch (err) {
    }
  };
  return (
    <>
      <BreadCrumb parentPageLink="/user" ParentPage="Home" pageName="Wallet Detials" ChildPage="Wallet Detials" imageUrl={breadCrumWallet} />
      <section className="">
        <div className="container  mb-5">
          <h1 className="fw-bold fs-4 my-5" style={{ letterSpacing: "1px" }}>Crypto Wallet Details</h1>
          <div 
      
          
          className="row d-flex justify-content-center align-items-center mt-5 mx-2 px-1"
          data-aos="zoom-in"
        
          >
            <div className="col col-lg-6 mb-4 mb-lg-0    " >
              <div className="adminProfileCard mb-3 " style={{ borderRadius: ".5rem" }}>
                <div className="row g-0">
                  <div
                    className="col-md-4 gradient-custom text-center text-white d-flex justify-content-center align-items-center flex-column"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem"
                    }}
                  >
                    <img
                      src={metamask}
                      alt="Avatar"
                      className="img-fluid my-4"
                    />
                    <h5 className=" fs-4">Meta Mask </h5>
                    <p className="text-secondary my-2">Wallet</p>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body px-4 pb-4 pt-lg-4">
                      <p className="fs-4 fw-bold mt-2  mb-2" style={{ letterSpacing: "2px" }}>Details</p>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-12 mb-3">
                          <h6>Wallet Address
                            <CopyToClipboard text={walletAddress}>
                              <MdOutlineContentCopy onClick={handleCopyToClipboardWalletAddresss} className=" UsernameCopyicon mx-2" style={{ display: "inline" }} />
                            </CopyToClipboard>
                          </h6>
                          <input className="bg-transparent outline-0 w-100 text-secondary " type="text" value={walletAddress} />
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-7 mb-3">
                          <h6>Bal. </h6>
                          <p className="text-secondary">  {balance?.formatted}</p>
                          <span className=" d-flex align-items-center justify-content-start" >
                            <p className="copyIcon fs-6  ">
                              {balance?.symbol}
                            </p>
                            < HiOutlineRefresh className="UsernameCopyicon mx-1 fs-5 " onClick={() => refetch()} />
                          </span>
                        </div>
                        <div className="col-5 mb-3">
                          <h6>Block Number</h6>
                          <p className="text-secondary mt-1"> {data?.toString()}</p>
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-7 mb-3">
                          <h6>Connected To</h6>
                          <p className="text-secondary mt-3"> {chain?.name ?? chain?.id}</p>
                        </div>
                        <div className="col-5 mb-3">
                          <h6>Switch To</h6>
                          {chains.map((x) =>
                            x.id === chain?.id ? null : (
                              <button key={x.id} onClick={() => handleNetworkSwitch(x.id, x.name)} className='simpleButton1 mt-2' >
                                {"" + x.name}
                                {isLoading && x.id === pendingChainId && ' ..'}
                              </button>
                            ),
                          )}
                        </div>
                      </div>
                      <p className="text-justify error  text-danger" style={{ fontSize: "x-small" }} >{error?.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default WalletDetails;
