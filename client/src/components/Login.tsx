import "../css/Registration.css";
import BreadCrumb from "./BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import registration from "../assets/BreadCrumbs/registration.png";
import login from "../assets/Login.png";
import { useFormik } from "formik";
import { loginValidate } from "../helper/validate";
import { useAuthStore } from "../store/store";
import { getUser, verifyPassword } from "../helper/helper";
import toast, { Toaster } from "react-hot-toast";
const Login: React.FC = () => {
  const navigate = useNavigate();
  const setUsername = useAuthStore((state) => state.setUsername);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setIsAdmin = useAuthStore((state) => state.setIsAdmin);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmpwd: "",
      email: "",
      fullName: "",
      mobile: "",
      address: "",
      region: "",
    },
    validate: loginValidate,
    onSubmit: async (values) => {
      setUsername(values.username);
      try {
        const res = await verifyPassword({ username: values.username, password: values.password });
        const { token } = res.data;
        localStorage.setItem('token', token);
    
        const userDataResponse = await getUser({ username: values.username });
        const userData = userDataResponse.data;
    
        if (userData.isMerchant) {
          setIsAdmin(true);
          localStorage.setItem('isAdmin', 'true');
          navigate('/admin');         
        } 
        else {
          navigate('/user');
        }
    
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');

        
        toast.promise(Promise.resolve(), {
          loading: 'Checking...',
          success: <b>Login Successfully...!</b>,
          error: <b>Password does not match!</b>
        });
      } catch (error) {
        toast.error('Password does not match!');
      }
    }
    
  });
  setUsername(formik.values.username);

  //if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  //if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <BreadCrumb
        parentPageLink="/"
        ParentPage="Home"
        pageName="Login To Your Account "
        ChildPage="Login"
        imageUrl={registration}
      />
      <div className="container mt-5">
        <div className="row pb-5">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <p style={{ fontSize: "x-large" }}>Login Here</p>
            {/* margin added */}
            <p
              className="mt-2 mb-2 text-secondary"
              style={{ fontSize: "larger" }}
            >
              Welcome Back! Login to your account
            </p>
            <form onSubmit={formik.handleSubmit}>
              <input
                {...formik.getFieldProps("username")}
                className="InputReg"
                type="text"
                placeholder=" User Name"
              />
              <br />
              {formik.touched.username && formik.errors.username ? (
                <p
                  className="error  text-danger"
                  id="nameError"
                  style={{ opacity: 1 }}
                >
                  {formik.errors.username}
                </p>
              ) : (
                <p
                  className="error  text-danger"
                  id="nameError"
                  style={{ opacity: 0 }}
                >
                  Error
                </p>
              )}
              <input
                {...formik.getFieldProps("password")}
                className="InputReg"
                type="password"
                placeholder=" Password"
              />
              <br />
              {formik.touched.password && formik.errors.password ? (
                <p className="error  text-danger" id="nameError">
                  {formik.errors.password}
                </p>
              ) : (
                <p
                  className="error  text-danger"
                  id="nameError"
                  style={{ opacity: 0 }}
                >
                  Error
                </p>
              )}
              <p className=" mb-2 text-secondary">
                Forgot Password?{" "}
                <span className="link-wrapper">
                  <Link className="LinkInput link hover-2" to="/recovery">
                    Recover Password
                  </Link>
                </span>
              </p>
              <button type="submit" className="standarButton-1 mt-2">
                Login
              </button>
            </form>
            <p className="mt-2 mb-5 text-secondary">
              Don't have an account?{" "}
              <span className="link-wrapper">
                <Link className="LinkInput link hover-2" to="/register">
                  Create One
                </Link>
              </span>
            </p>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 displayNone d-flex justify-content-center align-items-center">
            <img
              className="RegisterationImage"
              src={login}
              alt="Girl Registering Her Account"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
