import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoInformationCircle } from "react-icons/io5";
import BreadCrumb from "../BreadCrumb.tsx";
import ImportTokens from "../ImportTokensAccordian.tsx";
import LocalCurrencyConversion from "../LocalCurrencyConversion.tsx";
import buyTokens from "../../assets/buyTokens.png";
import buyToken from "../../assets/BreadCrumbs/buyZkTokens.png";
import "../../css/Registration.css";
import "../../css/TokenTraders.css";
import toast, { Toaster } from "react-hot-toast";
import { storebuyToken } from "../../helper/helper";
import { useFormik } from "formik";
import { jwtDecode } from "jwt-decode";
import { getUser } from "../../helper/helper";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;
import { filterMerchants } from "../../helper/helper";
const BuyTokens: React.FC = () => {

  const [merchantOptions, setMerchantOptions] = useState<[]>([]);
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken: any = token ? jwtDecode(token) : {};
  const username = decodedToken.username || "";
  const [userData, setUserData] = useState<any>("");



  const handleMerchantChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setServiceProvider(value);
    if (serviceProvider !== "") {
      const data = await filterMerchants(value);
      setMerchantOptions(data);
      console.log(merchantOptions)
    }
  };


  useEffect(() => {
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
    fetchUserData();
  }, [username]);

  const [admins, setAdmins] = useState<string[]>([]);

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

  const [metamask, setMetamask] = useState<string>(() => {
    const storedMetamask = localStorage.getItem("metamask");
    return storedMetamask !== null ? storedMetamask : "";
  });
  const [serviceProvider, setServiceProvider] = useState<string>(() => {
    const storedServiceProvider = localStorage.getItem("serviceProvider");
    return storedServiceProvider !== null ? storedServiceProvider : "";
  });
  const [localCurrencyVal, setLocalCurrencyVal] = useState<number>(() => {
    const storedLocalCurrencyVal = localStorage.getItem("localCurrencyVal");
    return storedLocalCurrencyVal !== null ? +storedLocalCurrencyVal : 0;
  });
  const [transactionfee, settransactionfee] = useState<number>(() => {
    const storedTransactionFee = localStorage.getItem("transactionfee");
    return storedTransactionFee !== null ? +storedTransactionFee : 0;
  });
  const [zkTokenVal, setZkTokenVal] = useState<number>(() => {
    const storedZkTokenVal = localStorage.getItem("zkTokenVal");
    return storedZkTokenVal !== null ? +storedZkTokenVal : 0;
  });
  const [file, setFile] = useState<File | null>(null);

  const [userInputLocalVal, setUserInputLocalVal] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem("metamask", metamask);
    localStorage.setItem("serviceProvider", serviceProvider);
    localStorage.setItem("localCurrencyVal", localCurrencyVal.toString());
    localStorage.setItem("transactionfee", transactionfee.toString());
    localStorage.setItem("zkTokenVal", zkTokenVal.toString());
  }, [metamask, serviceProvider, localCurrencyVal, transactionfee, zkTokenVal]);

  const handleDataUpdate = (
    localCurrencyVal: number,
    zkTokenVal: number,
    userInputLocalVal: number,
    transactionFee: number
  ) => {
    setLocalCurrencyVal(localCurrencyVal);
    setZkTokenVal(zkTokenVal);
    setUserInputLocalVal(userInputLocalVal);
    settransactionfee(transactionFee);
  };

  const [merchants, setMerchants] = useState<any>();

  useEffect(() => {
    const fetchMerchantsByUsername = async (username: any) => {
      try {
        const response = await axios.get(
          `/api/getMerchant?username=${username}`
        );
        return response.data.admins;
      } catch (error) {
        console.error("Error fetching merchants:", error);
        return [];
      }
    };

    const username = serviceProvider;
    fetchMerchantsByUsername(username)
      .then((merchants) => {
        setMerchants(merchants);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [serviceProvider]);

  const formik = useFormik({
    initialValues: {},

    onSubmit: async () => {
      if (!file) return;

      if (
        !admins.map((admin: any) => admin?.username).includes(serviceProvider)
      ) {
        toast.error(
          "Invalid seller name. Please select from the list of ZK-Token Sellers."
        );
        return;
      }

      try {
        const formData = new FormData();
        formData.append("buyer", userData._id);
        formData.append("metamaskAddress", metamask);
        formData.append("serviceProviderName", serviceProvider);
        formData.append("localCurrency", (localCurrencyVal || 0).toString());
        formData.append("TokensAmount", (zkTokenVal || 0).toString());
        formData.append("transactionFee", (transactionfee || 0).toString());
        formData.append("buyReceipt", file);

        const storebuyTokenPromise = storebuyToken(formData);
        toast.promise(storebuyTokenPromise, {
          loading: "Creating...",
          success: <b>Buy Tokens request sent Successfully...!</b>,
          error: <b>Error occurs while buying tokens.</b>,
        });
        await storebuyTokenPromise;

        // Clear fields and remove from local storage
        setMetamask("");
        setServiceProvider("");
        setLocalCurrencyVal(0);
        setZkTokenVal(0);
        setUserInputLocalVal(0);
        settransactionfee(0);
        setFile(null);
        localStorage.removeItem("metamask");
        localStorage.removeItem("serviceProvider");
        localStorage.removeItem("localCurrencyVal");
        localStorage.removeItem("transactionfee");
        localStorage.removeItem("zkTokenVal");

        // Redirect after successful submission
        navigate(`/buyTokens-reciept/${serviceProvider}`);
      } catch (error) {
        console.error("Error submitting buy token data:", error);
        toast.error("Error submitting buy token data. Please try again later.");
      }
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "image/png") {
      setFile(selectedFile);
    } else {
      console.error("Please select a PNG file.");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <BreadCrumb
        parentPageLink="/user"
        ParentPage="Home"
        pageName="Buy ZK-Tokens"
        ChildPage="Buy ZK-Tokens"
        imageUrl={buyToken}
      />
      <div className="pt-2 px-5">
        <ImportTokens text="Dont forget to import ZKT in Meta Mask wallet" />
        <div className="row pt-5 pb-5">
          <div className="col-xl-6 col-lg-6 col-md-6 displayNone centerDiv d-flex justify-content-center align-items-center">
            <img
              className="RegisterationImage"
              src={buyTokens}
              alt="Girl Registering Her Account"
            />
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <p
              style={{
                fontSize: "x-large",
                fontWeight: "bold",
                letterSpacing: "2px",
              }}
              className=""
            >
              Buy ZK-Tokens
            </p>
            <form
              onSubmit={formik.handleSubmit}
              encType="multipart/form-data"
              method="POST"
              action="/buyToken"
            >
              <input
                className="InputReg mt-4"
                type="text"
                placeholder="Enter Your Meta Mask Wallet Address"
                value={metamask || ""}
                onChange={(e) =>
                  setMetamask(String((e.target as HTMLInputElement).value))
                }
                required
              />



<div className="admin">
                <datalist id="filterMerchants">
                  {
                    merchantOptions.map((name, index) => (
                      <option key={index} value={name} />
                    ))}
                </datalist>
                <input
                  list="filterMerchants"
                  className="InputReg mt-4"
                  type="text"
                  placeholder="Enter Seller User Name"
                  value={serviceProvider || ""}
                  onChange={
                    handleMerchantChange
                    // (e) =>
                    // setServiceProvider(
                    //   String((e.target as HTMLInputElement).value)
                    // )
                  }
                  required
                />
                <p>
                  <span className="link-wrapper">
                    <Link
                      className="link hover-2 "
                      to="/zkt-providers"
                    >
                      {" "}
                      View ZK-Token Sellers
                    </Link>
                  </span>
                </p>
              </div>


              
              <div className="mt-4">
                {/*LocalCurrencyConversion commented in file:"BuyTokens" to save
                api free trial*/}
                <div className="mt-4">
                
                  {merchants && merchants.length > 0 && (
                    <LocalCurrencyConversion
                      onDataUpdate={handleDataUpdate}
                      merchantFee={merchants[0].merchantFee} 
                    />
                  )} 
                  
                </div>
              </div>
              <div
                className="mt-4 d-flex align-items-center justify-content-left"
                data-toggle="tooltip"
                data-placement="top"
                title="Click on ZK Token Seller Name to  view local bank account details"
              >
                <div className="">Attach bank reciept</div>
                <div className="mx-1">
                  <IoInformationCircle className="information" />
                </div>
              </div>
              <input
                className="InputReg  recieptChose"
                type="file"
                placeholder="Attach Reciept"
                name="buyReceipt"
                accept=".png"
                onChange={handleFileChange}
              />
              {file && <p>Selected File: {file.name}</p>}{" "}
              {/* Display the selected file name if a file is selected */}
              <button type="submit" className="my-4 btnStyle" rel="stylesheet">
                Generate Reciept
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default BuyTokens;
