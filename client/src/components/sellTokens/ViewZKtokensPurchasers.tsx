import BreadCrumb from "../BreadCrumb.tsx";
import BuyTokens from "../../assets/BreadCrumbs/ZKSellers.jpg"
import Author from "../../assets/author.jpg"
import "../../css/TokenTraders.css"
import { Link } from 'react-router-dom';
const ViewZKtokensPurchasers: React.FC = () => {
  return (
    <>
      <BreadCrumb parentPageLink='/sellTokens' ParentPage="Sell Tokens" pageName=" ZK-Token Purchasers" ChildPage=" ZK-Token Purchasers" imageUrl={BuyTokens} />
      <section id="" >
        <p className="mt-3  px-5" style={{ fontSize: "x-large", fontWeight: "bold" ,letterSpacing:"1px"}}>Online Zk-Token Purchasers</p>
        <p className="mt-3 mb-5 px-5" style={{ fontSize: "large"}}>Region: Pakistan</p>
        <div className="container">
          <div className="row ">
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-center ">
              <div className="card mb-5" style={{ width: "20rem" }}>
                <div className="card-body pb-5">
                  <div className=" mb-2 d-flex  align-items-center ">
                    {/* maira line 20 to 22 ko border radius do ka pora circle bna */}
                    <div className="p-2" style={{ width: "30%" }}>
                      <img className="img-fluid" src={Author} alt="feature 1" />
                    </div>
                    <div>
                      <p className="card-title fw-bolder mx-3" style={{ fontSize: "large", color: " rgb(28, 150, 127) " ,letterSpacing:"1px"}}>
                        Maira Anjum </p>
                      <p className="card-title  mx-3" style={{ fontSize: "small", color: "gray" }}>
                        mairaanjum86@gmail.com</p>
                    </div>
                  </div>
                  <p className="normalTextColor">
                    Region : Pakistan
                  </p>
                  <p className="normalTextColor">
                    Rating : 4/5
                  </p>
                  <p className="normalTextColor">
                    Number of Transactions Approved: 2
                  </p>
                  <p className="normalTextColor">
                    Average Response Time:15 mins
                  </p>
                  <p className="card-text mt-1" style={{ fontSize: "large", color: " rgb(28, 150, 127) " }}>
                    {"    "} Accounts </p>
                  <hr />
                  <div className="row   pt-2 pb-3 d-flex  " style={{ color: " rgb(28, 150, 127) " }}>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2 normalTextColor accDiv" style={{ fontSize: "small", textTransform: "uppercase" }}>
                     <p className="bankTitle">HBL</p>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2 normalTextColor accDiv" style={{ fontSize: "small", textTransform: "uppercase" }}>
                      <p className="bankTitle">SADA PAY</p>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2 normalTextColor accDiv " style={{ fontSize: "small", textTransform: "uppercase" }}>
                      <p className="bankTitle">EASY PASA</p>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2 normalTextColor accDiv" style={{ fontSize: "small", textTransform: "uppercase" }}>
                     <p className="bankTitle"> JAZZ CASH</p>
                    </div>
                  </div>
                  <center className="mt-4">
                    <Link to="/zkt-purchaser-profile" className="simpleButton1 ">
                      View Profile
                    </Link>
                  </center>
                </div>
              </div>
            </div>
        
          </div>
        </div>
      </section>
    </>
  );
};
export default ViewZKtokensPurchasers;
