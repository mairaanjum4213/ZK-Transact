import "../css/Footer.css";
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom';
import logo from "../assets/ICON.png"
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn, FaTwitter, FaInstagramSquare } from "react-icons/fa";
import { TfiAngleRight } from "react-icons/tfi";
const Footer: React.FC = () => {
  const location = useLocation();
  if (location.pathname === '/admin') {
    return null;
  }
  return (
    <>
      <div className="container-fluid " id="BoxPurp">
        <div className="container pt-3 pb-3">
          <div className="row  footerRemarks pb-3">
            <div className="col-lg-3 col-md-6 col-sm-12  mt-4 ">
              <div className="Logo-alignment">
                <img width="10%" src={logo} alt="" />
                <span className="mx-2 fs-5 fw-bold" style={{ letterSpacing: "2px" }} >
                  ZK-Transact
                </span>
              </div>
              <p className="mt-4 mb-4 text-justify" style={{ fontSize: "small" }}>
                Enjoy fast transactions with minimul fees in matter of minutes with no minimum limit.
              </p>
              <div className="text-center">
                <a className="mx-2 " href="https://www.facebook.com/">
                  <FaFacebookF className="socialIcons" />
                </a>
                <a className="mx-2 " href="https://www.linkedin.com/">
                  <FaLinkedinIn className="socialIcons" />
                </a>
                <a className="mx-2 " href="https://twitter.com/">
                  <FaTwitter className="socialIcons" />
                </a>
                <a className="mx-2 " href="https://instagram.com/">
                  <FaInstagramSquare className="socialIcons" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 text-center">
              <ul>
                <li >
                  <div className="link-wrapper">
                    <Link style={{ opacity: "0" }} className=" links link hover-2" to="/">opacity 0  </Link></div>
                </li>
                <li >
                  <div className="link-wrapper">
                    <Link className=" footerLinksParent link hover-2" to="/a"> <TfiAngleRight style={{ fontSize: "8px", display: "inline", marginRight: "2px" }} />   opt 1 </Link></div>
                </li>
                <li >
                  <div className="link-wrapper">
                    <Link className=" footerLinksParent link hover-2" to="/a"> <TfiAngleRight style={{ fontSize: "8px", display: "inline", marginRight: "2px" }} />   opt 1 </Link></div>
                </li>
                <li >
                  <div className="link-wrapper">
                    <Link className=" footerLinksParent link hover-2" to="/a"> <TfiAngleRight style={{ fontSize: "8px", display: "inline", marginRight: "2px" }} />   opt 1 </Link></div>
                </li>
                <li >
                  <div className="link-wrapper">
                    <Link className=" footerLinksParent link hover-2" to="/a"> <TfiAngleRight style={{ fontSize: "8px", display: "inline", marginRight: "2px" }} />   opt 1 </Link></div>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 text-center">
              <ul>
                <li >
                  <div className="link-wrapper">
                    <Link style={{ opacity: "0" }} className=" links link hover-2" to="/">opacity 0  </Link></div>
                </li>
                <li >
                  <div className="link-wrapper">
                    <Link className=" footerLinksParent link hover-2" to="/a"> <TfiAngleRight style={{ fontSize: "8px", display: "inline", marginRight: "2px" }} />   opt 1 </Link></div>
                </li>
                <li >
                  <div className="link-wrapper">
                    <Link className=" footerLinksParent link hover-2" to="/a"> <TfiAngleRight style={{ fontSize: "8px", display: "inline", marginRight: "2px" }} />   opt 1 </Link></div>
                </li>
                <li >
                  <div className="link-wrapper">
                    <Link className=" footerLinksParent link hover-2" to="/a"> <TfiAngleRight style={{ fontSize: "8px", display: "inline", marginRight: "2px" }} />   opt 1 </Link></div>
                </li>
                <li >
                  <div className="link-wrapper">
                    <Link className=" footerLinksParent link hover-2" to="/a"> <TfiAngleRight style={{ fontSize: "8px", display: "inline", marginRight: "2px" }} />   opt 1 </Link></div>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 text-center">
              <ul>
                <li >
                  <div className="link-wrapper">
                    <Link style={{ opacity: "0" }} className=" links link hover-2" to="/">opacity 0  </Link></div>
                </li>
                <li >
                  <div className="link-wrapper">
                    <Link className=" footerLinksParent link hover-2" to="/a"> <TfiAngleRight style={{ fontSize: "8px", display: "inline", marginRight: "2px" }} />   opt 1 </Link></div>
                </li>
                <li >
                  <div className="link-wrapper">
                    <Link className=" footerLinksParent link hover-2" to="/a"> <TfiAngleRight style={{ fontSize: "8px", display: "inline", marginRight: "2px" }} />   opt 1 </Link></div>
                </li>
                <li >
                  <div className="link-wrapper">
                    <Link className=" footerLinksParent link hover-2" to="/a"> <TfiAngleRight style={{ fontSize: "8px", display: "inline", marginRight: "2px" }} />   opt 1 </Link></div>
                </li>
                <li >
                  <div className="link-wrapper">
                    <Link className=" footerLinksParent link hover-2" to="/a"> <TfiAngleRight style={{ fontSize: "8px", display: "inline", marginRight: "2px" }} />   opt 1 </Link></div>
                </li>
              </ul>
            </div>
          </div>
          <div className="row  mt-3">
            <center>
              <p className="text-justify text-center" style={{ fontSize: "small" }}>
                <b style={{ color: "rgb(28, 150, 127)" }}>
                  <u > ZK-Transact.
                  </u>
                </b>
                {" "} FYP Project By Faheem Siddiqi & Maira Anjum
              </p>
            </center>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
