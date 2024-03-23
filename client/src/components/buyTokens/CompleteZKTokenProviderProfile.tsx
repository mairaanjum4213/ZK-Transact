
import React from 'react';
import BreadCrumb from "../BreadCrumb.tsx";
import BuyTokens from "../../assets/BreadCrumbs/ZKSellers.jpg";
import ZKtokeProviderProfile from './ZKtokeProviderProfile.tsx';


const CompleteZKTokenProviderProfile: React.FC = () => {
  return (
    <>
     <BreadCrumb
        parentPageLink=""
        ParentPage="Buy/Sell Tokens"
        pageName=" ZK-Token Sellers/Purchasers"
        ChildPage=" ZK-Token Sellers/Purchasers"
        imageUrl={BuyTokens}
      />
    <ZKtokeProviderProfile title="ZK-token Seller/Purchaser Profile"/>
    
    </>
  );
};

export default CompleteZKTokenProviderProfile;
