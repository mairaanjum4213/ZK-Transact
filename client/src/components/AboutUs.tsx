
import BreadCrumb from './BreadCrumb';
import aboutUs from '../assets/BreadCrumbs/Aboutus.jpg';
import "../css/AboutUs.css";
import AboutusExchange from './subSections/AboutusExchange';
import AboutusFeatures from './subSections/AboutusFeatures';
import HigherLimits from './subSections/HigherLimits';
import StakeHolders from './subSections/StakeHolders.tsx';
const AboutUs: React.FC = () => {
  return (
    <>   
      <BreadCrumb parentPageLink='/' ParentPage ="Home" pageName="About Us" ChildPage="About Us"  imageUrl={aboutUs} /> 
     
      <AboutusFeatures/>
      <AboutusExchange/>
      <HigherLimits/>
      <StakeHolders />
    </>
  );
};
export default AboutUs;
