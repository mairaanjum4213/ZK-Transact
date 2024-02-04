import "../../css/ImportTokens.css";
import "../../css/WalletDetails.css"
import toast from 'react-hot-toast';
import { VscCircleFilled } from "react-icons/vsc";
import { MdOutlineContentCopy } from "react-icons/md";
import { CopyToClipboard } from 'react-copy-to-clipboard';
const AccountDetailsModal: React.FC = () => {
    const handleCopyToClipboard = () => {
        toast.success('Contract address copied! ');
    };
    return (
        <>
            <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop-3"
                className="mx-2 simpleButton1 outline-0 ">
                <p >Accounts</p>
            </button>
            <div
                className="modal fade "
                id="staticBackdrop-3"
                // use static instead of relatice in case important model that close only by pressing x
                data-bs-backdrop="static"
                data-bs-keyboard="true"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel-2"
                aria-hidden="true"
            >
                <div className="modal-dialog  modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header py-5" id="accountDetailsModalBg">
                            <h5 className="modal-title fw-bold" id="staticBackdropLabel-3">
                                Account Details
                            </h5>
                        </div>
                        <div className="modal-body ">
                            <div className="container ">
                                <div className="row">
                                    {/* step:1 */}

                                    {/* <VscCircleFilled className="mt-1 mx-1" style={{ color: '#3eaa96cb', minWidth: "20px", minHeight: "30px" }} />  */}
                                    <div className="d-flex flex-column justify-content-left align-items-left ">

                                        <h1 className="fw-bold">Easy Pasa </h1>
                                        <h1 className="">Aik text area rk rha jis ma admin kud sa apni details dal dega wo hum is ma p tag ma deka denga</h1>
                                        <h1 className="fw-bold">Account Name lorem:</h1>
                                    </div>

                                    <table>
                                        <tr>  <th>Easy Pasa</th></tr>
                                        <tr>
                                            <td>
                                                Account Number
                                            </td>
                                            <td>
                                                <div className=" container d-flex justify-start-center align-items-center  w-75 ">
                                                    <input style={{ width: "100%", backgroundColor: "transparent", fontSize: "medium" }} disabled value={'ADD VAIRABLE JISA COPY KRNA'} type='text' />
                                                    <CopyToClipboard onCopy={handleCopyToClipboard} text={"ADD VAIRABLE JISA COPY KRNA"}>
                                                        <MdOutlineContentCopy className=" copyIcon  mx-2" />
                                                    </CopyToClipboard>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Comments
                                            </td>
                                            <td>
                                                Account Title is  Faheem Siddiqi
                                            </td>
                                        </tr>
                                    </table>

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
export default AccountDetailsModal;
