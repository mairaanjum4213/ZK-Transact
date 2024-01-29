import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";
import "../css/Registration.css"
import HomeLocker from "../assets/ABC.jpg";
import wallet from "../assets/wallet.png"
import confirmation from "../assets/confirmation.png"
import currency from "../assets/currency.png"
import usingZkTransact from "../assets/Group 163.png";
import feature1 from "../assets/Effortless Transaction.png";
import feature2 from "../assets/Streamlined Transaction.png";
import feature3 from "../assets/Full Disclosure.png";
import HomeFeature from "./subSections/HomeFeatures.tsx"
declare function setInterval(callback: (...args: any[]) => void, ms: number): number;
declare function clearInterval(intervalId: number): void;
const Home: React.FC = () => {
  const words = ['Annual Fees', 'Costly Conversions', 'Slow Transactions'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentLetterIndex <= words[currentWordIndex].length) {
        setCurrentWord(() => words[currentWordIndex].slice(0, currentLetterIndex));
        setCurrentLetterIndex((prev) => prev + 1);
      } else if (currentWord !== '') {
        setCurrentWord(() => currentWord.slice(0, -1));
      } else {
        setCurrentWord('');
        setCurrentLetterIndex(0);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }, 120);
    return () => clearInterval(intervalId);
  }, [currentWordIndex, currentLetterIndex, currentWord]);
  return (
    <>
      
      <section id="heroSection" className="container-fluid " >
        <div className="container">
          <div className="row ">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 alignCenter mt-5">
              <h1 className="text-white heroContenth1" id="" style={{ fontWeight: "bold" }}>
                Say Goodbye To
              </h1>
              <h2 className="textAnimate ">
                <span className="borderBottom heroContenth2" >
                  <b style={{}}>{currentWord} {" "}.</b>
                </span>
              </h2>
              <h6 className="mt-4 mb-5 descriptionHeader text-secondary" style={{
                fontSize: "large"
              }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae nihil, natus consequuntur incidunt nulla eos laborum vel, eaque libero quia, quod minima aperiam expedita perferendis placeat maxime deleniti. Accusantium, deleniti?m
              </h6>
              <Link data-aos="zoom-in" data-aos-duration="500" className="btn mb-5 btnStyle" to="/register">
                Get Started
              </Link>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  d-flex align-items-center justify-content-center  displayNone">
              <div>
                <img className="homeImageLocker img-fluid" src={HomeLocker} alt="HomeLockerBreadcrumb" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* -- Section: Features  ---                                                              */}
      <HomeFeature />
      {/* -- Section: Using ZK-Transact   --- */}
      <section id="usingZKTransact">
        <div className="container pb-4 pt-4 ">
          <div className="row ">
            <p className=" text-center text-white  " style={{ fontSize: "x-large", fontWeight: "bold" }}>Carry out Transactions with ZK-Transact</p>
            <div data-aos="fade-up-right" data-aos-duration="1000" className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 displayNone d-flex justify-content-center align-items-center text-center ">
              <img className="img-fluid " src={usingZkTransact} alt="carry out transaction img" />
            </div>
            <div data-aos="fade-up-left" data-aos-duration="1000" className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 alignCenter mt-5">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6  d-flex justify-content-center  ">
                  <div className="row">
                    <div className="col-12">
                      <img className="" src={wallet} alt="wallet icon" />
                      <h1 className="mt-2 text-white" style={{ fontSize: "large" }}>Set Up Your Wallet</h1>
                      <p className="text-secondary text-justify mt-2 mb-2 ">Conect meta mask wallet by clicking the button top right corner. </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6  d-flex justify-content-center  ">
                  <div className="row">
                    <div className="col-12">
                      <img src={currency} alt="currency selection icon" />
                      <h1 className="mt-2 text-white" style={{ fontSize: "large" }}>Currency Selection</h1>
                      <p className="text-secondary  text-justify mt-2 mb-2">Select the country currency you want to exhange for conversion.</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* 2nd row  */}
              <div className="row mt-3">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6  d-flex justify-content-center align-content-center  ">
                  <div className="row">
                    <div className="row">
                      <div className="col-12">
                        <img src={currency} alt="currency selection icon" />
                        <h1 className="mt-2 text-white" style={{ fontSize: "large" }}>Currency Selection</h1>
                        <p className="text-secondary  text-justify  mt-2 mb-2">Select the country currency you want to exhange for conversion.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6  d-flex justify-content-center  ">
                  <div className="row">
                    <div className="col-12">
                      <img src={confirmation} alt="confirmation icon" />
                      <h1 className="mt-2 text-white" style={{ fontSize: "large" }}>Confirm the transaction</h1>
                      <p className="text-secondary   text-justify mt-2 mb-2  ">Confirm the transaction and send request for approval approval</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* -- Section: Why US   --- */}
      <section id="WhyUs" >
        <p className="mt-3 mb-5 text-center" style={{ fontSize: "x-large", fontWeight: "bold" }}>Replacing Complexity with simplicity </p>
        <div className="container">
          <div className="row ">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-center ">
              <div data-aos="zoom-in-left" data-aos-offset="5" data-aos-duration="1500" className="card mb-5" style={{ width: "18rem" }}>
                <center>
                  <img className="card-img-top mt-5 mb-3" src={feature1} alt="feature 1" />
                </center>
                <div className="card-body pb-5">
                  <h5 className="card-title fw-bolder" style={{ fontSize: "large", color: " rgb(28, 150, 127) " }}>
                    Effortless Registration </h5>
                  <p className="card-text" style={{ color: "#7B7B93" }}>
                    Get started in just a few minutes of Email and KYC verification only instead of extensive paperwork
                  </p>
                </div>
              </div>
            </div>
            <div data-aos="zoom-out-up" data-aos-offset="3" data-aos-duration="600" className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-center">
              <div className="card mb-5 " style={{ width: "18rem" }}>
                <center>
                  <img className="card-img-top mt-5 mb-3" src={feature2} alt="feature 2" />
                </center>
                <div className="card-body pb-5">
                  <h5 className="card-title fw-bolder" style={{ fontSize: "large", color: " rgb(28, 150, 127) " }}>
                    Streamlined Transaction </h5>
                  <p className="card-text" style={{ color: "#7B7B93" }}>
                    Experience the ease of sending and receiving funds within minutes move your money within seconds!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-xxl-4  col-lg-4 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-center ">
              <div data-aos="zoom-in-right" data-aos-offset="5" data-aos-duration="1500" className="card mb-5" style={{ width: "18rem" }}>
                <center>
                  <img className="card-img-top mt-5 mb-3" src={feature3} alt="feature 3" />
                </center>
                <div className="card-body pb-5">
                  <h5 className="card-title fw-bolder" style={{ fontSize: "large", color: " rgb(28, 150, 127) " }}>
                    Full Disclosure </h5>
                  <p className="card-text" style={{ color: "#7B7B93" }}>
                    We are committed to complete transparency User-sensitive information is known even to us!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* -- Section: Get Started ---                                                              */}
      <section id="getStarted" className="container-fluid " >
        <div className="container  pb-5  ">
          <div className="row pt-5 ">
            <h1 className="getStartedh1 text-center"> Ready To Get Started</h1>
            <div className=" getStartedP text-justify text-white pt-5 pb-5">
              Unlock a world of fast, secure, and cost-effective international money transfers with ZK Transact. Enjoy speedy transactions with minimal fees, often completed within minutes. No more minimum limits – whether it's a small amount or a substantial transfer, we've got you covered. Sign up now for a seamless experience, where your money moves as fast as you do!
            </div>
          </div>
          <div data-aos="zoom-in" data-aos-duration="500" className="row  d-flex justify-content-center">
            <Link to='/register' className="btnStyle">SignUp</Link>
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;
