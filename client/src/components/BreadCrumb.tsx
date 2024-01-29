import "../css/Breadcrumb.css";
import { Link } from "react-router-dom";
{/* for ParentPage
import BreadCrumb from '../components/BreadCrumb';
import registration  from "../assets/BreadCrumbs/registration.png"
 <BreadCrumb parentPageLink="/aboutUs"  ParentPage ="Home" pageName="Login" ChildPage="Login"  imageUrl={registration} />    
 */}
//Props data type
interface BreadCrumbProps {
  imageUrl: string;
  pageName: string;
  ParentPage: string;
  ChildPage: string;
  parentPageLink: string;
}
const BreadCrumb: React.FC<BreadCrumbProps> = (props) => {
  const bgStyle = { backgroundImage: `url(${props.imageUrl})` };
  return (
    <>



    
      <div className="breadcrumb-wrap  " style={bgStyle}>
        <div className="container">
      <div className="breadcrumb-title  " >
            <h2  className="weight" >
              
              {props.pageName}</h2>
            <ul className="breadcrumb-menu list-style">
              <li>
                <Link to={props.parentPageLink}>
                  {props.ParentPage}
                </Link>
              </li>
              <li>{props.ChildPage}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default BreadCrumb;
