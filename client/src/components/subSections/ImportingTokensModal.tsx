import "../../css/ImportTokens.css";
import "../../css/WalletDetails.css"
import toast from 'react-hot-toast';
import { VscCircleFilled } from "react-icons/vsc";
import { MdOutlineContentCopy } from "react-icons/md";
import { CopyToClipboard } from 'react-copy-to-clipboard';
const ImportingTokensModal: React.FC = () => {
    const handleCopyToClipboard = () => {
        toast.success('Contract address copied! ');
    };
    return (
        <>
            <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop-2"
                className="mx-2 textBtn outline-0 ">
                <p >learn More</p>
            </button>
            <div
                className="modal fade "
                id="staticBackdrop-2"
                // use static instead of relatice in case important model that close only by pressing x
                data-bs-backdrop="static"
                data-bs-keyboard="true"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel-2"
                aria-hidden="true"
            >
                <div className="modal-dialog  modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header py-5" id="intructionModalBg">
                            <h5 className="modal-title fw-bold" id="staticBackdropLabel-2">
                                Import ZK-Tokens
                            </h5>
                        </div>
                        <div className="modal-body ">
                            <div className="container ">
                                <div className="row">
{/* step:1 */}
                                    <div className="d-flex justify-content-left align-items-center">
                                        <VscCircleFilled className="mt-1 mx-1" style={{ color: '#3eaa96cb', minWidth: "20px", minHeight: "30px" }} /> <h6 className="mt-2">
                                            Reference: https://support.metamask.io/hc/en-us/articles/360015489031-How-to-display-tokens-in-MetaMask
                                        </h6>
                                    </div>

{/* step:2 */}
                                    <div className=" d-flex justify-content-left align-items-center">
                                        <VscCircleFilled className="mt-1 mx-1" style={{ color: '#3eaa96cb', minWidth: "20px", minHeight: "30px" }} /> <h6 className="mt-2">
                                            Install Meta Mask Extension on your browser
                                        </h6>
                                    </div>
                                    <div className="d-flex justify-content-left align-items-center">
                                        <VscCircleFilled className="mt-1 mx-1" style={{ color: '#3eaa96cb', minWidth: "20px", minHeight: "30px" }} /> <h6 className="mt-2">
                                            Search maira in the file
                                        </h6>
                                    </div>
                                </div>
{/* copy address */}
                                <div className="mt-3 container d-flex justify-start-center align-items-center inputModel w-75 ">
                                    <input style={{ width: "100%", backgroundColor: "transparent", fontSize: "small" }} disabled value={'MAira ADD CONTRACT ADDRESSS HERE"-1'} type='text' />
                                    <CopyToClipboard onCopy={handleCopyToClipboard} text={"MAira ADD CONTRACT ADDRESSS HERE-2"}>
                                        <MdOutlineContentCopy className=" copyIcon  mx-2" />
                                    </CopyToClipboard>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="  simpleButton1 mt-2 mx-4 px-4 mb-2"
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
export default ImportingTokensModal;
