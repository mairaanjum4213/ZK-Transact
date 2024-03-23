
import React from 'react';
import BreadCrumb from "../BreadCrumb.tsx";
import BuyTokens from "../../assets/BreadCrumbs/ZKSellers.jpg";
import ViewZKtokensProviders from './ViewZKtokensProviders.tsx';

const CompleteViewZKTokenProvider: React.FC = () => {
  return (
    <>
    <BreadCrumb
        parentPageLink="/buyTokens"
        ParentPage="Buy Tokens"
        pageName=" ZK-Token Sellers"
        ChildPage=" ZK-Token Sellers"
        imageUrl={BuyTokens}
    />
    <ViewZKtokensProviders title="Online ZK-token Sellers" />
    </>
  );
};

export default CompleteViewZKTokenProvider;
