import "../css/Registration.css";
import BreadCrumb from './BreadCrumb';
import { Link, useNavigate } from "react-router-dom";
import registration from "../assets/BreadCrumbs/registration.png"
import register from "../assets/Register.png"
import { useFormik } from 'formik';
import { registerValidation } from "../helper/validate";
import { registerUser } from '../helper/helper'
import toast, { Toaster } from 'react-hot-toast';
// when ever we need to use console word we need to declare it 
declare var console: {
  log: (...args: any[]) => void;
  error: (...args: any[]) => void;
  // Add other methods if needed
};
const Register: React.FC = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmpwd: '',
      email: '',
      fullName: '',
      mobile: '',
      address: '',
    
    },
    validate: registerValidation,
    onSubmit: async (values) => {
      values = await Object.assign(values);
      let registerPromise = registerUser(values)
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success: <b>Register Successfully...!</b>,
        error: <b>Could not Register.</b>
      });
      registerPromise.then(function () { navigate('/login') });
    }
  });
  return (
    <>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <BreadCrumb parentPageLink="/" ParentPage="Home" pageName="Register New Account " ChildPage="Register" imageUrl={registration} />
      <div className="container mt-5">
        <div className="row ">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
            <p style={{ fontSize: "x-large" }}>
              Register a new account
            </p>
            <p className="mt-2  mb-2 text-secondary" style={{ fontSize: "large" }}>
              Create a new account
            </p>
            <form onSubmit={formik.handleSubmit}>
              <input
                {...formik.getFieldProps('fullName')}
                className="InputReg"
                type="text"
                placeholder=" Full Name"
              />
              <p className="error  text-danger" id="nameError" style={{ opacity: 0 }}>
                Error
              </p>
              <br />
              <input
                {...formik.getFieldProps('username')}
                className="InputReg"
                type="text"
                placeholder=" User Name"
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
              <input
                {...formik.getFieldProps('email')}
                className="InputReg"
                type="email"
                placeholder=" Email"
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
              <input
                {...formik.getFieldProps('password')}
                className="InputReg"
                type="password"
                placeholder=" Password"
              />
              <br />
              {formik.touched.password && formik.errors.password ? (
                <p className="error  text-danger" id="nameError" style={{ opacity: 1 }}>
                  {formik.errors.password}
                </p>
              ) : (
                <p className="error  text-danger" id="nameError" style={{ opacity: 0 }}>
                  Error
                </p>
              )}
              <button type="submit" className="standarButton-1 mt-2">
                Register Now
              </button>
            </form>
            <p className="mt-2 mb-5  text-secondary " >Already have an account ?  <span className="link-wrapper"> <Link className="LinkInput   link hover-2" to="/Login"> Login</Link></span></p>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 displayNone d-flex justify-content-center align-items-center">
            <img className="RegisterationImage" src={register} alt="Girl Registering Her Account" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
