
import React from 'react';
import BreadCrumb from "../BreadCrumb.tsx";
import BuyTokens from "../../assets/BreadCrumbs/ZKSellers.jpg";
import ZKtokeProviderProfile from '../buyTokens/ZKtokeProviderProfile.tsx';



const CompleteZKTokenPurchasers: React.FC = () => {
  return (
    <>
     <BreadCrumb parentPageLink='/sellTokens' ParentPage="Sell Tokens" pageName=" ZK-Token Purchaser" ChildPage=" ZK-Token Purchaser" imageUrl={BuyTokens} />
    <ZKtokeProviderProfile title="ZK-token Purchaser Profile"/>
    </>
  );
};

export default CompleteZKTokenPurchasers;
