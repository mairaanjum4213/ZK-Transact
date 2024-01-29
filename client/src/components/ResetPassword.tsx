import React, {  useEffect} from 'react';
import { useFormik } from 'formik';
import { resetpasswordValidate } from '../helper/validate';
import { resetPassword } from '../helper/helper';
import { useAuthStore } from '../store/store';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import "../css/Registration.css"
import BreadCrumb from './BreadCrumb';
import forgetPassword from '../assets/BreadCrumbs/ressetPassword.jpg';
const ResetPassword: React.FC = () => {
  const { username } = useAuthStore(state => state.auth);
  const navigate = useNavigate();
  const { isRecovery } = useAuthStore(state => state.auth);
  const setIsRecovery = useAuthStore(state => state.setIsRecovery);
  useEffect(() => {
    // Retrieve isAuthenticated from localStorage during initial mount
    const storedAuth = localStorage.getItem('isRecovery');
    if (storedAuth) {
      setIsRecovery(storedAuth === 'true');  
    }
    if(!isRecovery){
      navigate('/login');
    }
  }, [setIsRecovery]);

  
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmpwd: '',
      email: '',
      fullName: '',
      mobile: '',
      address: ''
    },
    validate: resetpasswordValidate,
    onSubmit: async values => {
      try {
        const resetResponse = await resetPassword({ username, password: values.password });
        toast.success('Reset Password Successful!');
        navigate('/login');
      } catch (error) {
        toast.error('Could not Reset!');
      }
    }
  });

  return (
    <>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <BreadCrumb parentPageLink='/login' ParentPage='Login' pageName='Reset Password ' ChildPage='Reset Password' imageUrl={forgetPassword} />
      <div className='container pt-4 pb-5   '>
        <div className='row'>
          <p className="text-center  " style={{ fontSize: 'x-large' }}>Reset Password</p>
          <p className='mt-2  mb-3 text-secondary text-center ' style={{ fontSize: 'larger' }}>Enter new Password</p>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 otpBody">
            <form onSubmit={formik.handleSubmit}>
              <input
                {...formik.getFieldProps('password')}
                className='InputReg'
                type='password'
                placeholder='New Password'
              />
              <br />
              {formik.touched.password && formik.errors.password ? (
                <p className='error text-danger' id='nameError' style={{ opacity: 1 }}>
                  {formik.errors.password}
                </p>
              ) : (
                <p className="error  text-danger" id="nameError" style={{ opacity: 0 }}>
                  Error
                </p>
              )}
              <input
                {...formik.getFieldProps('confirmpwd')}
                className='InputReg'
                type='password'
                placeholder='Confirm Password'
              />
              <br />
              {formik.touched.password && formik.errors.confirmpwd ? (
                <p className='error text-danger' id='nameError' style={{ opacity: 1 }}>
                  {formik.errors.confirmpwd}
                </p>
              ) : (
                <p className="error  text-danger" id="nameError" style={{ opacity: 0 }}>
                  Error
                </p>
              )}
              <button type='submit' className='standarButton-1 mt-3 '>
                Reset
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default ResetPassword;
