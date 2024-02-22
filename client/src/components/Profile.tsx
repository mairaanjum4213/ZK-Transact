import "../css/Registration.css";
import BreadCrumb from './BreadCrumb';
import KYCrequiredModal from "./KYCrequiredModal.tsx"
import profiling from "../assets/BreadCrumbs/BreadCrumb1.png"
import { useFormik } from 'formik';
import { profileValidation } from "../helper/validate";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from "../helper/helper";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../store/store";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  const decodedToken: any = token ? jwtDecode(token) : {}; // Decode the token (Modify this according to your token structure)
  const username = decodedToken.username || ''; // Extract username from decoded token
  const setIsAuthentiacted = useAuthStore(state => state.setIsAuthenticated);
  const [userData, setUserData] = useState<any>({});
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  useEffect(() => {
    // Function to get user data and update state
    async function fetchUserData() {
      try {
        const response = await getUser({ username });
        if (response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData(); // Fetch user data on component mount
  }, [username]);
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isLoggedOut]); // Add isLoggedOut to dependency array to trigger effect on its change
  const formik = useFormik({
    initialValues: {
      username: userData.username,
      password: '',
      confirmpwd: '',
      email: userData.email,
      fullName: userData.fullName,
      address: userData.address,
      mobile: userData.mobile,
   
    },
    enableReinitialize: true,
    validate: profileValidation,
    onSubmit: async (values) => {
      if (values.username !== userData.username) {
        toast.error("Username cannot be changed");
        return;
      }
      let updatePromise = updateUser({
        email: values.email,
        fullName: values.fullName,
        address: values.address,
        mobile: values.mobile,


      });
      toast.promise(updatePromise, {
        loading: 'Updating...',
        success: <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>
      });
    }
  });
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedOut(true);
    setIsAuthentiacted(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };
  console.log(userData.kycStatus);
  return (
    <>

      {userData.kycStatus === false && <KYCrequiredModal />}

      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <BreadCrumb parentPageLink="/user" ParentPage="Home" pageName="My Profile" ChildPage="Edit Profile" imageUrl={profiling} />
      <div className="container mt-5">
        <p style={{ fontSize: "x-large" }}>
          {username}{"'s  "}Profile
        </p>
        <p className="mb-2 mt-2 text-secondary" style={{ fontSize: "large" }}>
          Edit profile
        </p>
        <div className="row">
       
          <ul className="text-danger fw-bold fs-5">


          <li>
              No check in case user dont write uesr name and press forget password
            </li>

            <li>
              Add a region input field
            </li>
            
            <li>
              create a compoent that renders incases user didnt  have kyc and region selected
             , buy sell ma use hona
            </li>

            <li>
              error handling wrong user name login
            </li>

            <li>
              profile updation on otp confiramtion
            </li>

<li>
  kyc status must be shown in profile
</li>
          </ul>
    
          <form onSubmit={formik.handleSubmit}>
            {/* Full Name and Phone No on the same line for large screens */}
            <div className="row"> <div className="col-lg-6 col-md-6 col-sm-12">
              <input
                {...formik.getFieldProps('fullName')}
                className="InputReg"
                disabled
                type="text"
                placeholder="Full Name"
              />
              <p className="error  text-danger" id="nameError" style={{ opacity: 0 }}>
                Error
              </p>
            </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <input
                  {...formik.getFieldProps('username')}
                  className="InputReg"
                  type="text"
                  placeholder="User Name"
                />
                <br />
                {formik.touched.username && formik.errors.username ? (
                  <p className="error  text-danger" id="nameError" style={{ opacity: 1 }}>
                    {formik.errors.username}
                  </p>
                ) : (
                  <p className="error  text-danger" id="nameError" style={{ opacity: 0 }}>
                    Error
                  </p>
                )}
                <br />
              </div>
            </div>
            <div className="row"> <div className="col-lg-6 col-md-6 col-sm-12">
              <input
                {...formik.getFieldProps('address')}
                className="InputReg"
                type="text"
                placeholder="Address"
              />
              <p className="error  text-danger" id="nameError" style={{ opacity: 0 }}>
                Error
              </p>
            </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <input
                  {...formik.getFieldProps('mobile')}
                  className="InputReg"
                  type="tel"
                  placeholder="Phone Number"
                />
                <p className="error  text-danger" id="nameError" style={{ opacity: 0 }}>
                  Error
                </p>
              </div>
            </div>
            <div className="row"> <div className="col-lg-6 col-md-6 col-sm-12">
              <input
                {...formik.getFieldProps('email')}
                className="InputReg"
                type="email"
                placeholder="Email"
              />
              <br />
              {formik.touched.email && formik.errors.email ? (
                <p className="error  text-danger" id="nameError" style={{ opacity: 1 }}>
                  {formik.errors.email}
                </p>
              ) : (
                <p className="error  text-danger" id="nameError" style={{ opacity: 0 }}>
                  Error
                </p>
              )}
            </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
              </div>
            </div>
            <div className="col-12 mb-3  mt-2">
              <button type="submit" className="btnStyle " >
                Update
              </button>
            </div>
            <p className="mt-2 mb-5  text-secondary " >Want to logout? <span className="link-wrapper"> <button onClick={handleLogout} className="LinkInput   link hover-2"> Logout</button></span></p>
          </form>
        </div>
      </div>
    </>
  );
};
export default Profile;
