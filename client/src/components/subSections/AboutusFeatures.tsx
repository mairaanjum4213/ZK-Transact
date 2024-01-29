import "../../css/Home.css"
import "../../css/AboutUs.css"
import updated from "../../assets/updated.png"
import perks from "../../assets/perks.png"
import asap from "../../assets/moneyASAP.png"
const AboutusFeatures: React.FC = () => {
    return (
        <>
            <center>
            </center>
            <section id="bg">
                <div className="container pt-5 pb-5 ">
                    <div data-aos="zoom-in"  data-aos-duration="2000"  data-aos-offset="5" className="row  d-flex justify-content-center align-items-center">
                        <p className=" text-center  text-white" style={{ fontSize: "x-large", fontWeight: "bold" }}>Connecting you to the world</p>
                        <div  className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12    ">
                            <p className="text-center text-white " style={{ fontSize: "x-large", fontWeight: "bold" }}>Keep more of your eannings <span>&#128176;</span></p>
                            <p className="text-center mt-2 text-secondary">Experience seamless and cost-effective transactions on our platform
                            </p>
                            <div className="d-flex  justify-content-center  align-items-center mt-5 mb-4">
                                <div>
                                    <img src={asap} alt="Notifications" />
                                </div>
                                <div className=" mx-3" style={{ width: "50%" }} >
                                    <p className="text-white" style={{ fontSize: "large" }}>Your money, ASAP!</p>
                                    <p className=" text-secondary"> Get you money transfer in minutes</p>
                                </div>
                            </div>
                            <div className="d-flex  justify-content-center align-items-center mt-5 mb-4">
                                <div>
                                    <img src={updated} alt="Notifications" />
                                </div>
                                <div className=" mx-3" style={{ width: "50%" }} >
                                    <p className="text-white" style={{ fontSize: "large" }}>We keep you updated</p>
                                    <p className=" text-secondary"> Real time updates for your transactoin.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  d-flex align-items-center justify-content-center pt-5 displayNone">
                            <img className=" img-fluid" style={{ width: "70%" }} src={perks} alt="HomeLockerBreadcrumb" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default AboutusFeatures;
