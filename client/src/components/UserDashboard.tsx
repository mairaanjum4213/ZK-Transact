
import BreadCrumb from './BreadCrumb';
import aboutUs from '../assets/BreadCrumbs/Aboutus.jpg';


const UserDashboard: React.FC = () => {
  return (
    <>   
      <BreadCrumb parentPageLink='/user' ParentPage ="Home" pageName="User Dashboard" ChildPage="Dashboard"  imageUrl={aboutUs} /> 
     <p>
        User Dash Board
     </p>
      
    </>
  );
};
export default UserDashboard;
