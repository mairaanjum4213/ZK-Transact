
import React from 'react';
import BreadCrumb from "../BreadCrumb.tsx";
import BuyTokens from "../../assets/BreadCrumbs/ZKSellers.jpg";
import ViewZKtokensProviders from '../buyTokens/ViewZKtokensProviders.tsx';


const CompleteViewZKTokenPurchasers: React.FC = () => {
  return (
    <>
    <BreadCrumb parentPageLink='/sellTokens' ParentPage="Sell Tokens" pageName=" ZK-Token Purchasers" ChildPage=" ZK-Token Purchasers" imageUrl={BuyTokens} />
    <ViewZKtokensProviders title="Online ZK-token Purchasers" />
    </>
  );
};

export default CompleteViewZKTokenPurchasers;
