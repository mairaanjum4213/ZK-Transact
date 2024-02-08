import React, { useState, useEffect } from 'react';

const KYCrequiredModal: React.FC = () => {
  const [handleModal, setHandleModal] = useState(true);
  
  const c = true
  useEffect(() => {
      // kyc status ki value idr fetch kro assign to handleModal varaible add in dependency list  of use effect too
 
    setHandleModal(c);
  }, [c]); 

  const handleCloseModal = () => {
    setHandleModal(false); 
  };

  return (
    <>
      <div
        className="modal fade show"
        id="staticBackdrop-3"
        data-bs-backdrop="relative"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel-2"
        aria-hidden="true"
        style={{ display: handleModal ? 'block' : 'none' }}
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header py-4" id="kyc">
              <h5 className="modal-title fw-bold" style={{ letterSpacing: '2px' }} id="staticBackdropLabel-3">
                KYC Verification
              </h5>
              <button
                type="button"
                className="btn-close closeBtn"
                aria-label="Close"
                onClick={handleCloseModal} // Handle click event to close the modal
              >
                <span> x</span>
              </button>
              <br />
            </div>
            <div className="modal-body">
              <div className="container text-justify">
                <span className="">
                  Your KYC status is <span className="mx-1 fw-bold">{" in progress"}</span> Remember KYC
                  verification is required for any sort of transaction in this platform to prevent any sort of
                  illegal transactions
                </span>
              </div>
            </div>
            <div className="modal-footer">
              
              <button type="button" className=" simpleButton1 my-2">
                Go to Verification
              </button>
              <button type="button" className=" simpleButton2 my-2 px-4" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KYCrequiredModal;
