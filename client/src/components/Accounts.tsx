import BreadCrumb from "./BreadCrumb";
import { useEffect, useState } from "react";
import breadCrumb from "../assets/BreadCrumbs/bankBreadcrumb.png";
import "./chat/Admindashboard.css";
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { getUser } from "../helper/helper";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;
const Accounts: React.FC = () => {
  const token = localStorage.getItem("token");
  const decodedToken: any = token ? jwtDecode(token) : {};
  const username = decodedToken.username || "";
  const [userData, setUserData] = useState<any>("");
  
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

  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountName, setAccountName] = useState("");

  const fetchUserData = async () => {
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

  const handleAddAccount = async () => {
    try {
      const response = await axios.post("/api/accounts", {
        accountNumber,
        accountType,
        accountName,
      });
      const createdAccountId = response.data.account._id; // Get the created account id
      assignAccountToUser(createdAccountId); // Automatically assign account to user
      toast.success("Account added!");
      await fetchUserData();      
    } catch (error) {
      toast.error("Problem adding account.");
    }
  };

  const assignAccountToUser = async (accountId: string) => {
    try {
      await axios.put(`/api/users/${userData._id}/accounts/${accountId}`);
    } catch (error) {
      toast.error("Problem while adding account ");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <BreadCrumb
        parentPageLink="/"
        ParentPage="Home"
        pageName="Local Accounts"
        ChildPage="Accounts"
        imageUrl={breadCrumb}
      />
      <div className="container mt-5">
        <h2 className="font-semibold tracking-wider ">Add Accounts</h2>
      </div>
      <div className="mx-auto flex  w-full lg:w-6/12 ">
        <div className=" w-full  my-8 p-4 accountsCard rounded-xl">
          <h1 className="text-xl font-bold mb-4">Add Account</h1>
          <div className="mb-4">
            <label className="block mb-2">Bank Name:</label>
            <input
              type="text"
              name="bankName"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="w-full border border-gray-700 rounded-md py-2 px-2 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Account Number:</label>
            <input
              required
              type="text"
              name="accNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full border border-gray-700 rounded-md py-2 px-2 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Account Holder Name:</label>
            <input
              type="text"
              name="accComment"
              placeholder="Enter account holder name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full border border-gray-700 rounded-md py-2 px-2 focus:outline-none focus:border-blue-400"
            />
          </div>
          <button
            type="submit"
            onClick={handleAddAccount}
            className="standarButton-1"
          >
            Add Account
          </button>
        </div>
      </div>

      <div className="container my-5">
        <div>
          <h2 className="font-semibold tracking-wider ">Existing Accounts</h2>
          {userData?.accounts?.length === 0 && (
            <p className="mt-3 mb-10 text-danger">*No Account </p>
          )}
        </div>

        {/* Dynamic Card */}
        <div className="flex flex-col w-full lg:w-6/12 mx-auto gap-2">
          {userData?.accounts?.map((account:any, index:any) => (
            <div
              key={index}
              className="my-4 flex bg-stone-300 accountsCard rounded-md hover:shadow-md"
            >
              <div className="flex-grow p-3">
                <div>
                  <h5 className="font-semibold tracking-widest my-2">
                    Bank Name
                  </h5>
                  <p>{account?.accountType}</p>
                </div>
                <div>
                  <h5 className="font-semibold tracking-widest my-2">
                    Account Number
                  </h5>
                  <p>{account?.accountNumber}</p>
                </div>
                <div>
                  <h5 className="font-semibold first-letter:tracking-widest my-2">
                  Account Holder Name
                  </h5>
                  <p>{account?.accountName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Accounts;
