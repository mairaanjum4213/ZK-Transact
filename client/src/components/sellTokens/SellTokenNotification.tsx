import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

const SellTokenNotification: React.FC = () => {
  
  const [selltokenData, setSelltokenData] = useState<any>(null);
  const { requestId } = useParams<{ requestId: string }>();

  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchSellRequestData = async () => {
      try {
        const response = await axios.get(`/api/userwithselltoken/${requestId}`);
        setSelltokenData(response.data);
      } catch (error) {
        console.error("Error fetching sell request data:", error);
      }
    };
    fetchSellRequestData();
  }, [requestId]);

  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-200">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h1 className="text-2xl font-bold mb-4">Sell Token Request Sent</h1>
        <p className=" ">Your sell token request against {selltokenData?.Tokens} has been sent to the <b>{selltokenData?.purchaserName}</b> for approval.</p>
        <p className="mb-3 mt-2">Please wait patiently while your request for sell tokens is under review.</p>

           <div className="border-t border-gray-400 pt-2">
           <h1 className="text-2xl font-bold mb-2">Response from Admin:</h1>
           <p className="">Status : {selltokenData?.transactionStatus}</p>
           <p>Comments: {selltokenData?.commentsByAdmin}</p>
           <button className="w-full md:w-auto mt-4 md:mt-0 md:ml-2" style={{ padding: '10px 20px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onClick={()=> navigate('/chats')}>Chat with Admin</button>
         </div>
      
   
      </div>
    </div>
  );
};

export default SellTokenNotification;
