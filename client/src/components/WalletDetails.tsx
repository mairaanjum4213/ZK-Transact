import "../css/navDetails.css"
import { IoWalletSharp } from "react-icons/io5";
import { IoRefreshCircle } from "react-icons/io5";
import { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdOutlineContentCopy } from "react-icons/md";
import toast from 'react-hot-toast';
import { useNetwork, useSwitchNetwork } from 'wagmi'
import { useBlockNumber } from 'wagmi'
import { useAccount, useEnsName, useBalance } from 'wagmi'
const WalletDetails: React.FC = () => {
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
    const updatedAddress = address ?? 'Default Address'; // Replace 'Default Address' with your fallback value
    setWalletAddress(updatedAddress);
  }, [address])
  const handleCopyToClipboard = () => {
    toast.success('Wallet address copied! ');
  };
  const handleNetworkSwitch = async (id: number, name: string) => {
    try {
      if (switchNetwork) { // Check if switchNetwork is defined
        await switchNetwork(id);
        toast.success(`Switching to ${name}`);
      }
    } catch (err) {
    }
  };
  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"

        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        <span> <IoWalletSharp className="  walletDetails" /></span>
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-scrollable">
          <div className="modal-content  ">
            <div className="modal-header p-4  " id="modalBg">
              <h5 className="modal-title " id="staticBackdropLabel">
                Wallet Details
              </h5>
              <button
                type="button"
                className="btn-close closeBtn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >   <span> <IoClose className="closeBtn" /></span> </button>
            </div>
            <div className="modal-body ">
              <div className="container ">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2  d-flex justify-content-start align-items-center chainNameQ">
                    <h6 >Connected To Chain </h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2 mb-2 d-flex justify-content-start  align-items-center chainName">
                    {chain?.name ?? chain?.id}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2 mb-2  d-flex justify-content-start">
                    <h6 className='chainNameQ'>Block Number </h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2 mb-3  chainName d-flex align-items-center justify-content-start">
                    {data?.toString()}
                  </div>
                </div>
                {switchNetwork && (
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2 mb-3 d-flex justify-content-start">
                      <h6>Switch To </h6>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2 mb-3 d-flex justify-content-center">
                      {chains.map((x) =>
                        x.id === chain?.id ? null : (
                          <button key={x.id} onClick={() => handleNetworkSwitch(x.id, x.name)} className='network' >
                            {x.name}
                            {isLoading && x.id === pendingChainId && ' (switching)'}
                          </button>
                        ),
                      )}
                    </div>
                    <p style={{ fontSize: "x-small" }} className="error  text-danger">{error?.message}</p>
                  </div>
                )}
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2 mb-2 d-flex justify-content-start">
                    <h6> Wallet Address</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2 mb-2 d-flex justify-start-center align-items-center ">
                    <input style={{ fontSize: "small", width: "100%" }} value={" " + walletAddress} disabled className='modalInput' placeholder=' Account Number' type='text' />
                    <CopyToClipboard onCopy={handleCopyToClipboard} text={walletAddress}>
                      <MdOutlineContentCopy className=" copyIcon  mx-1" />
                    </CopyToClipboard>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2 d-flex justify-content-start">
                    <h6>Available Balance  </h6>  <h6 onClick={() => refetch()}> <IoRefreshCircle className="refetch mx-2" /> </h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2 d-flex justify-content-start">
                    <p>
                      <span className="text-secondary">  {balance?.formatted}{" "}</span>
                      <span className="copyIcon" style={{ fontSize: "small" }}>
                        {balance?.symbol}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary footerCloseBtn"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// 
export default WalletDetails;
