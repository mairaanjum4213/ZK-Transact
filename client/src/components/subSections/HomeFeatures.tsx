import "../../css/Home.css"
import notification from "../../assets/Notificaiton.png"
import currencyConversion from "../../assets/CurrencyCoversion.png"
import happyCustomer from "../../assets/HappyCustomer.png"
import global from "../../assets/Global.png"
const HomeFeaturesStatic: React.FC = () => {
  return (
    <>
      <section>
        <div className="container pt-5 pb-5">
          <div className="row ">
            <p className=" text-center mb-2 " style={{ fontSize: "x-large", fontWeight: "bold" }}>Connecting you to the world</p>
            <div data-aos="fade-down-right"  data-aos-duration="1500"  data-aos-offset="2" className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12   ">

              <div className="d-flex  justify-content-center  align-items-center mt-5 mb-4">
                <div>
                  <img src={currencyConversion} alt="Notifications" />
                </div>
                <div className=" mx-3" style={{ width: "50%" }} >

                  <p className="" style={{ fontSize: "large" }}>Real-time Notification</p>
                  <p className=" text-secondary">  Experience the most favourable conversion rates with in the system for conversion.</p>
                </div>
              </div>

              <div className="d-flex  justify-content-center  align-items-center mt-5 mb-4">
                <div>
                  <img src={notification} alt="Notifications" />
                </div>
                <div className=" mx-3" style={{ width: "50%" }} >
                  <p className="" style={{ fontSize: "large" }}>Real-time Notification</p>
                  <p className=" text-secondary"> You’ll get instant transaction alerts on your email whenever there’s activity on your account..</p>

                </div>
              </div>

              <div className="d-flex  justify-content-center align-items-center mt-5 mb-4">
                <div>
                  <img src={global} alt="Notifications" />
                </div>
                <div className=" mx-3" style={{ width: "50%" }} >
                  <p className="" style={{ fontSize: "large" }}>Transfer Assets Globally</p>
                  <p className=" text-secondary"> ZK-Transact  facilitates global money transfer ensuring fast, low cost and private transactions.</p>


                </div>
              </div>
            </div>
            <div  data-aos="fade-up-left"  data-aos-duration="1000"  data-aos-offset="2" className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  d-flex align-items-center justify-content-center  displayNone">
              <img className=" img-fluid " src={happyCustomer} alt="HomeLockerBreadcrumb" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default HomeFeaturesStatic;
