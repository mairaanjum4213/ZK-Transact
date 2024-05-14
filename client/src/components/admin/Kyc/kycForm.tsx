import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { getUser } from "../../../helper/helper";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

export default function kycForm() {
  
  const [rejection, setRejection] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [pendingKYCRequests, setPendingKYCRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPendingKYCRequests = async () => {
      try {
        const response = await axios.get("/api/admin/pending-kyc-requests");
        setPendingKYCRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pending KYC requests:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchPendingKYCRequests();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const showimage = (image: string) => {
    window.open(`http://localhost:8080/identities/${image}`);
  };

  const handleRejectionClick = async (id: any) => {
    try {
      const response = await axios.put(`/api/admin/reject-kyc/${id}`, {
        reasonRejection: rejectionReason,
      });
      toast.success('KYC Request rejected for this user');
      window.location.reload();
    } catch (error) {
      toast.error("Error rejecting KYC request");
    }
  };

  const handleApproveClick = async (id: any, userId: any) => {
    try {
      const response = await axios.put(`/api/admin/approve-kyc/${id}`);
      const response2 = await axios.put(`/api/users/update-kyc-status/${userId}`);
      toast.success('KYC Request approved for this user');
      window.location.reload();
    } catch (error) {
      toast.error("Error approving KYC request");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="p-5">
        <h2>KYC Requests</h2>
        {pendingKYCRequests.length === 0 ? (
          <div>No pending KYC requests</div>
        ) : (
          pendingKYCRequests.map((request: any) => (
            <div className="mx-auto flex w-full lg:w-6/12" key={request._id}>
              <div className="w-full my-8 p-4 bgLightGret bdr rounded-lg">
                <div className="mb-4">
                  <h2>{request.name}</h2>
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Nationality:</label>
                  <input
                    required
                    type="text"
                    value={request.nationality}
                    name="accNumber"
                    className="w-full borderStandard rounded-[0.3rem] bg-transparent py-[0.7rem] px-2 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Date of Birth:</label>
                  <input
                    type="text"
                    value={request.dob}
                    name="accComment"
                    className="w-full py-[0.7rem] borderStandard rounded-[0.3rem] bg-transparent px-2 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Gender:</label>
                  <input
                    type="text"
                    value={request?.gender}
                    name="accComment"
                    className="w-full py-[0.7rem] borderStandard rounded-[0.3rem] bg-transparent px-2 focus:outline-none"
                  />
                </div>
                <p
                  onClick={() => showimage(request?.nationalIdentity)}
                  style={{
                    cursor: "-webkit-grabbing",
                    cursor: "grabbing",
                  }}
                  className="relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-right"
                >
                  View Identity
                </p>
                <div className="flex gap-2 my-2">
                  <button            
                    onClick={() => handleApproveClick(request?._id, request?.user?._id)}
                    className="simpleButton1"
                  >
                    Approve
                  </button>
                  <button
                    type="submit"
                    onClick={() => setRejection(true)} 
                    className="simpleButton2 px-3"
                  >
                    Reject
                  </button>
                </div>
                {rejection && (
                  <>
                    <textarea
                      placeholder="Enter Reason For Rejection "
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      className="w-full py-[0.7rem] borderStandard rounded-[0.3rem] bg-transparent my-2 px-2 focus:outline-none"
                    />
                    <div className="w-5/12">
                      <button
                        className="standarButton-1 my-4"
                        onClick={() => handleRejectionClick(request?._id)}
                      >
                        Reject Request
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
