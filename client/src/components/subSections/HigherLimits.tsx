import "../../css/Home.css"
import "../../css/AboutUs.css"
import highLimits from "../../assets/highFitness.png"
const HigherLimits: React.FC = () => {
    return (
        <>
            <section id="bg">
                <div className="container">
                    <div className="row pt-5 pb-5 " >
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12   d-flex  align-items-center">
                            <div>
                                <h2 className="fw-bold HigherLimitsH text-white" >
                                    Higher Limits,more savings
                                </h2>
                                <p className="mt-5 text-secondary HigherLimitsP" >
                                    Unlock greater financial potential with our  transaction limits  with minimal charges!
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 displayNone d-flex justify-content-center align-items-center ">
                            <img style={{ width: "45%" }} src={highLimits} alt="higherLimit" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default HigherLimits;