
import Author from "../../assets/author.jpg";
import "../../css/TokenTraders.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getUser } from "../../helper/helper.tsx";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;


interface Props {
  title: string;
}

const ViewZKtokensProviders: React.FC<Props> = ({title}) => {
  const token = localStorage.getItem("token");
  const decodedToken: any = token ? jwtDecode(token) : {};
  const username = decodedToken.username || "";
  const [userData, setUserData] = useState<any>("");

  // -----User Data
  useEffect(() => {
    // Fetching User Data for Id
    async function fetchUserData() {
      try {
        const response = await getUser({ username });
        if (response.data) {
          setUserData(response.data);
          // To Access Id or other data of user from db just use userData._id
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, [username]);

  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userData) return;

        const response = await axios.get(
          `/api/getMerchants?region=${userData.region}&id=${userData?._id}`
        );
        setAdmins(response.data.admins);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userData]);
  console.log(admins)

  return (
    <>
      
      <section id="">
        <p
          className="mt-3  px-5"
          style={{
            fontSize: "x-large",
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
        >
         {title}
        </p>
        <p className="mt-3 mb-5 px-5" style={{ fontSize: "large" }}>
          Region: {userData?.region}
        </p>
        <div className="container">
          <div className="row ">
            {admins.map((admin: any) => (
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-center ">
                <div className="card mb-5" style={{ width: "20rem" }}>
                  <div className="card-body pb-5">
                    <div className=" mb-2 d-flex  align-items-center ">
                      {/* maira line 20 to 22 ko border radius do ka pora circle bna */}
                      <div className="p-2" style={{ width: "30%" }}>
                        <img
                          className="img-fluid"
                          src={Author}
                          alt="feature 1"
                        />
                      </div>
                      <div>
                        <p
                          className="card-title fw-bolder mx-3"
                          style={{
                            fontSize: "large",
                            color: " rgb(28, 150, 127) ",
                            letterSpacing: "1px",
                          }}
                        >
                          {admin?.username}{" "}
                        </p>
                        <p
                          className="card-title  mx-3"
                          style={{ fontSize: "small", color: "gray" }}
                        >
                          {admin?.email}
                        </p>
                      </div>
                    </div>
                    <p className="normalTextColor">Region : {admin?.region}</p>
                    <p className="normalTextColor">Rating : 4/5</p>
                    <p className="normalTextColor">
                      Number of Transactions Approved: 2
                    </p>
                    <p
                      className="card-text mt-1"
                      style={{
                        fontSize: "large",
                        color: " rgb(28, 150, 127) ",
                      }}
                    >
                      {"    "} Accounts{" "}
                    </p>
                    <hr />

                    <div
                      className="row   pt-2 pb-3 d-flex  "
                      style={{ color: " rgb(28, 150, 127) " }}
                    >
                      {admin?.accounts?.map((account: any) => (
                        <div
                          className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2 normalTextColor accDiv"
                          key={account._id}
                        >
                          <p className="bankTitle">{account?.accountType}</p>
                        </div>
                      ))}
                    </div>

                    <p
                      className="card-text mt-1"
                      style={{
                        fontSize: "large",
                        color: " rgb(28, 150, 127) ",
                      }}
                    >
                      {"    "} Metamask{" "}
                    </p>
                    <hr />
                    <p>{admin?.wallet?.metamaskAddress}</p>

                    <center className="mt-4">
                      <Link
                        to={`/user/${admin.username}`}
                        className="simpleButton1 "
                      >
                        View Profile
                      </Link>
                    </center>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default ViewZKtokensProviders;
