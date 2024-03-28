import { useEffect, useState } from "react";
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
  };
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
      setAccountNumber("");
      setAccountType("");
      setAccountName("");
      await fetchUserData();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
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
      <div className="container mt-5">
        <h2 className="font-semibold     tracking-wider ">Add Accounts</h2>
      </div>
      <div className="mx-auto flex  w-full lg:w-6/12 ">
        <div className=" w-full  my-8 p-4 accountsCard rounded-sm">
          <h1 className="text-xl font-semibold mb-4 tracking-[0.2rem]">
            Add Account
          </h1>
          <div className="mb-4">
            <label className="block mb-2">Bank Name:</label>
            <input
              type="text"
              name="bankName"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="w-full  text-white genericBg rounded-sm py-[0.7rem]  px-2 focus:outline-none "
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
              className="w-full  rounded-sm  genericBg py-[0.7rem] px-2 focus:outline-none "
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Account Holder Name:</label>
            <input
              type="text"
              name="accComment"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full rounded-sm py-[0.7rem]   genericBg px-2 focus:outline-none"
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
        <div className="flex flex-col w-full lg:w-9/12 mx-auto gap-2">
          {userData?.accounts?.map((account: any, index: any) => (
            <div
              key={index}
              className="my-4 flex bg-stone-300    accountsCard rounded-sm hover:shadow-md"
            >
              <div className="flex-grow p-3">
                <div>
                  <p className="text-xl font-semibold border-b w-fit tracking-[0.1rem] my-2">
                    Bank Name
                  </p>
                  <p>{account?.accountType}</p>
                </div>
                <div>
                  <p className="text-xl font-bold border-b w-fit tracking-[0.1rem] my-2">
                    Account Number
                  </p>
                  <p>{account?.accountNumber}</p>
                </div>
                <div>
                  <p className="text-xl font-bold border-b w-fit tracking-[0.1rem] my-2">
                    Account Holder Name
                  </p>
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
