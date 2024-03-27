import BreadCrumb from "./BreadCrumb";
import React, { useState } from 'react';
import faqs from "../assets/BreadCrumbs/faqs.png";
const Faqs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const togglePanel = (index:any) => {
    setActiveIndex(activeIndex === index ? null : index);
  }
  return (
    <>
      <BreadCrumb parentPageLink='/' ParentPage="Home" pageName="Faqs" ChildPage="Faqs" imageUrl={faqs} />
      <div className="container">
        <h2 className="font-semibold my-4">
          Frequently Asked Questions
        </h2>
        <div className="custom-accordion my-5  w-11/12 mx-auto lg:w-8/12">
          <div className="custom-panel my-4">
            <h2 className="custom-header">
              <button
                className={`genericBg w-full text-left text-lg p-3 ${activeIndex === 1 ? 'active' : ''}`}
                onClick={() => togglePanel(1)}
              >
                How does your remittance system work?
              </button>
            </h2>
            <div
              className={`custom-content ${activeIndex === 1 ? 'show' : ''}`}
              aria-expanded={activeIndex === 1 ? 'true' : 'false'}
            >
              {activeIndex === 1 && (
                <div className="p-2 genericBg text-base tracking-wider ">
                  Our remittance system utilizes ERC20 tokens on the Ethereum blockchain as the standard currency for transactions. Users can deposit their funds into our platform, convert them into ERC20 tokens, and then initiate cross-border transfers. The recipient receives the equivalent amount in their local currency after the exchange rate is determined.
                </div>
              )}
            </div>
          </div>
          <div className="custom-panel my-4">
            <h2 className="custom-header">
              <button
                className={`genericBg  w-full text-left text-lg p-3  ${activeIndex === 2 ? 'active' : ''}`}
                onClick={() => togglePanel(2)}
              >
                What are the advantages of using ERC20 tokens for remittance?
              </button>
            </h2>
            <div
              className={`custom-content ${activeIndex === 2 ? 'show' : ''}`}
              aria-expanded={activeIndex === 2 ? 'true' : 'false'}
            >
              {activeIndex === 2 && (
                <div className="p-2 genericBg text-base tracking-wider ">
                  Using ERC20 tokens offers several advantages, including faster transaction times compared to traditional banking systems, lower transaction fees, and increased transparency due to the immutable nature of blockchain technology. Additionally, users have more control over their funds and can track their transactions in real-time.
                </div>
              )}
            </div>
          </div>
          <div className="custom-panel my-4">
            <h2 className="custom-header">
              <button
                className={`genericBg  w-full text-left text-lg p-3 ${activeIndex === 3 ? 'active' : ''}`}
                onClick={() => togglePanel(3)}
              >
                How do you determine the exchange rate between ERC20 tokens and local currency?
              </button>
            </h2>
            <div
              className={`custom-content ${activeIndex === 3 ? 'show' : ''}`}
              aria-expanded={activeIndex === 3 ? 'true' : 'false'}
            >
              {activeIndex === 3 && (
                <div className="p-2 genericBg text-base tracking-wider">
                  The exchange rate between ERC20 tokens and local currency is determined based on real-time market data from reputable cryptocurrency exchanges. We calculate the most favorable rate for our users, taking into account factors such as liquidity, volatility, and transaction fees.
                </div>
              )}
            </div>
          </div>
          <div className="custom-panel my-4">
            <h2 className="custom-header">
              <button
                className={` genericBg  rounded-sm  w-full text-left text-lg p-3 ${activeIndex === 4 ? 'active' : ''}`}
                onClick={() => togglePanel(4)}
              >
                How long does it take for a remittance transaction to complete?
              </button>
            </h2>
            <div
              className={`custom-content ${activeIndex === 4 ? 'show' : ''}`}
              aria-expanded={activeIndex === 4 ? 'true' : 'false'}
            >
              {activeIndex === 4 && (
                <div className="p-2 genericBg  text-base   tracking-wider ">
                  The time it takes for a remittance transaction to complete depends on various factors, including network congestion and the processing speed of the recipient's bank or payment provider. Typically, transactions on the Ethereum blockchain can be confirmed within minutes, but it may take additional time for the recipient to receive the funds in their local currency.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Faqs;
