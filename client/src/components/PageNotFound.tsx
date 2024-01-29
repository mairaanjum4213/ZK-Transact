import React from "react";
import NotFound from "../assets/404 NotFound.png";
import "../css/PageNotFound.css";
const PageNotFound: React.FC = () => {
  const handleGoBack = () => {
    history.back();
  };
  return (
    <>
      <div className="container Parent-404">
        <img className="img-fluid Img404" src={NotFound} alt="" />
        <p className="mt-2" style={{ fontSize: "x-large" }}>
          <b>
            Ops! Page Not Found !
          </b>
        </p>
        <p className="text-center" style={{ fontSize: "large" }}> The page you are looking is not available</p>
        <button className="btnStyle mt-3 " onClick={handleGoBack}> Go Back </button>
      </div>
    </>
  );
};
export default PageNotFound;
