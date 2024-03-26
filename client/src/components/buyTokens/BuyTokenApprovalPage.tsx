import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

const BuyTokenApprovalPage: React.FC = () => {
  const [buytokenData, setBuytokenData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBuyToken();
    const intervalId = setInterval(fetchBuyToken, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchBuyToken = async () => {
    try {
      const result = await axios.get("/api/getbuytokens");
      setBuytokenData(result.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };
  
  if (!buytokenData) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-200">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-200">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h1 className="text-2xl font-bold mb-4">Buy Token Request Sent</h1>
        <p className=" ">Your Buy token request against {buytokenData?.localCurrency} has been sent to the <b>{buytokenData?. serviceProviderName}</b> for approval.</p>
        <p className="mb-3 mt-2">Please wait patiently while your request for buy tokens is under review.</p>
        {buytokenData?.status === 'Pending' && (
          <div className="border-t border-gray-400 pt-2">
            <h1 className="text-2xl font-bold mb-2">Response from Admin:</h1>
            <p className="">Status : Pending</p>
            <button className="w-full md:w-auto mt-4 md:mt-0 md:ml-2" style={{ padding: '10px 20px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onClick={()=> navigate('/chats')}>Chat with Admin</button>
          </div>
        )}
        {buytokenData?.status === 'Declined' ||  buytokenData?.status === 'Approved' && (
           <div className="border-t border-gray-400 pt-2">
           <h1 className="text-2xl font-bold mb-2">Response from Admin:</h1>
           <p className="">Status : {buytokenData?.status}</p>
           <p>Comments: {buytokenData?.adminComments}</p>
           <button className="w-full md:w-auto mt-4 md:mt-0 md:ml-2" style={{ padding: '10px 20px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onClick={()=> navigate('/chats')}>Chat with Admin</button>
         </div>
        )}
   
      </div>
    </div>
  );
};

export default BuyTokenApprovalPage;
