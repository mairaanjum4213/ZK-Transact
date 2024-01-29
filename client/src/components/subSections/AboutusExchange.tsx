import "../../css/Home.css"
import "../../css/AboutUs.css"
import updated from "../../assets/globalPayment.png"
import exchangeRates from '../../assets/exchangeRates.png';
import asap from "../../assets/NoHiddenCharges.png"
const AboutusExchange: React.FC = () => {
    return (
        <>
            <center>
            </center>
            <section id="ExchangeRates">
                <div className="container pt-5 pb-5">
                    <div   className="row  d-flex justify-content-center align-items-center">
                        <div data-aos="fade-up-right"  data-aos-duration="1500"  data-aos-offset="10" className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  d-flex align-items-center justify-content-center  pt-5 displayNone">
                            <img className=" img-fluid " src={exchangeRates} alt="icon" />
                        </div>
                        <div data-aos="fade-up-left"  data-aos-duration="2000"  data-aos-offset="5" className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12   ">
                            <p className="text-center  " style={{ fontSize: "x-large", fontWeight: "bold" }}>Exchange rates you’ll love <span>&#128150;</span></p>
                            <p className="text-center mt-2 text-secondary">Exchange rate headaches are things of past
                            </p>
                            <div className="d-flex  justify-content-center  align-items-center mt-5 mb-4">
                                <div>
                                    <img src={asap} alt="hidden chrages icon" />
                                </div>
                                <div className=" mx-3" style={{ width: "50%" }} >
                                    <p className="" style={{ fontSize: "large" }}>Global Money</p>
                                    <p className=" text-secondary">Send you remittance to any one on planet.</p>
                                </div>
                            </div>
                            <div className="d-flex  justify-content-center align-items-center mt-5 mb-4">
                                <div>
                                    <img src={updated} alt="Notifications" />
                                </div>
                                <div className=" mx-3" style={{ width: "50%" }} >
                                    <p className="" style={{ fontSize: "large" }}>No hidden fee</p>
                                    <p className=" text-secondary"> No hidden annual charges.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default AboutusExchange;
