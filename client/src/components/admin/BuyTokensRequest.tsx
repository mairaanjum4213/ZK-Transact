import { useState } from "react";
const BuyTokensRequest: React.FC = () => {
    return (
        <>
          <button
                            className=" standarButton-1"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#BuyRequests"
                            aria-controls="BuyRequests"
                        >
                           See Recent Requests
                        </button>

<div
                            className="offcanvas offcanvas-start adminSide rounded"
                            tabIndex={-1}
                            id="BuyRequests"
                            aria-labelledby="BuyRequests"
                        >

                            <div className="flex flex-column h-screen  justify-start mx-3 my-3 overflow-y-auto">
                                <h2 className=" my-3 text-xl text-white">
                                    Recent Requests
                                </h2>
                                <hr className="w-2/3 mb-2 text-white" />
                                <div className="my-2 w-11/12 mx-auto flex text-justify rounded  "
                                >
                                    <div className=" w-full h-fit mx-auto sidebarOptions text-gray-300">
                                        User Name asked for transaction of 240 Tokens <br />
                                        Search in code make it dynamic
                                    </div>
                                </div>
                            </div>
                        </div>


        
        </>
    );
};
export default BuyTokensRequest;
