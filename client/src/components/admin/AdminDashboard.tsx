import BreadCrumb from '../BreadCrumb.tsx';
import aboutUs from '../../assets/BreadCrumbs/Aboutus.jpg';
const AdminDashboard: React.FC = () => {
  return (
    <>
      <BreadCrumb parentPageLink='/admin' ParentPage="Home" pageName="Admin Dashboard" ChildPage="Dashboard" imageUrl={aboutUs} />
      <p>
        Admin Dash Board
      </p>
    </>
  );
};
export default AdminDashboard;
