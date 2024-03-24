import React, { useState } from 'react';

const BuyTokenApprovalPage: React.FC = () => {
  

  // Assume response is received and set in the state
  const response = "hardcodedd"
 

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Sell Token Request Sent</h1>
        <p className="text-gray-600 mb-4">Your sell token request has been sent to the admin for approval.</p>
        <p className="text-gray-600 mb-8">Please wait patiently while it is under review.</p>
        {response && (
          <div className="border-t pt-4">
            <h2 className="text-lg font-bold mb-2">Response from Admin:</h2>
            <p className="text-gray-600">{response}</p>
          </div>
        )}
        {!response && (
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Go Back
          </button>
        )}
      </div>
    </div>
  );
};

export default BuyTokenApprovalPage;
