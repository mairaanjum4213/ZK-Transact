import React, { useState, useEffect } from "react";
import BreadCrumb from "../BreadCrumb.tsx";
import "../../css/Registration.css";
import ZkTokenConversion from "../ZkTokenConversion.tsx";
import { IoInformationCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import sellTokens from "../../assets/BreadCrumbs/buyZkTokens.png";
import buyToken from "../../assets/sellTokens.png";
// Backend integration
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { getUser, storesSellToken } from "../../helper/helper";
import axios from "axios";

const SellTokens: React.FC = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const decodedToken: any = token ? jwtDecode(token) : {};
  const username = decodedToken.username || "";
  const [userData, setUserData] = useState<any>("");
  const [sellerMetamask, setSellerMetamask] = useState<string>(
    () => localStorage.getItem("sellerMetamask") || ""
  );
  const [purchaserName, setPurchaserName] = useState<string>(
    () => localStorage.getItem("purchaserName") || ""
  );
  const [accountNumber, setAccountNumber] = useState<string>(
    () => localStorage.getItem("accountNumber") || ""
  );
  const [accountName, setAccountName] = useState<string>(
    () => localStorage.getItem("accountName") || ""
  );
  const [accountComments, setAccountComments] = useState<string>(
    () => localStorage.getItem("accountComments") || ""
  );
  const [contractHash, setContractHash] = useState<string>(
    () => localStorage.getItem("contractHash") || ""
  );
  // From ZK Token Conversion
  const [localCurrencyVal, setLocalCurrencyVal] = useState<number>();
  const [transactionfee, settransactionfee] = useState<number>();
  const [inputZKToken, setInputZKToken] = useState<number>();

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

   
   const [transferTokenData, settransferTokenData] = useState<any>();
   useEffect(() => {
     if (userData && userData._id) {
       fetchtransferToken();
     }
   }, [userData]);
   const fetchtransferToken = async () => {
     try {
       const result = await axios.get(
         `/api/getalltransfertokens/sender/${userData._id}`
       );
       settransferTokenData(result.data);
     } catch (error) {
       console.error("Error fetching files:", error);
     }
   };

  useEffect(() => {
    localStorage.setItem("sellerMetamask", sellerMetamask);
    localStorage.setItem("purchaserName", purchaserName);
    localStorage.setItem("accountNumber", accountNumber);
    localStorage.setItem("accountName", accountName);
    localStorage.setItem("accountComments", accountComments);
    localStorage.setItem("contractHash", contractHash);
  }, [
    sellerMetamask,
    purchaserName,
    accountNumber,
    accountName,
    accountComments,
    contractHash,
  ]);

  const handleDataUpdate = (
    roundedNum: number,
    inputZKToken: number,
    transactionFee: number
  ) => {
    setLocalCurrencyVal(roundedNum);
    setInputZKToken(inputZKToken);
    settransactionfee(transactionFee);
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      if (!admins.map((admin:any) => admin?.username).includes(purchaserName)) {
        toast.error(
          "Invalid purchaser name. Please select from the list of ZK-Token Purchasers."
        );
        return;
      }

       // Check if transferTokenData contains the contractHash
  if (!transferTokenData || !transferTokenData.some((token:any) => token.transferContractHash === contractHash)) {
    toast.error("Invalid contract hash. Please select from the list of transfer contract hashes.");
    return;
  }
      try {
        const values = {
          seller: userData?._id,
          sellerMetamask: sellerMetamask,
          purchaserName: purchaserName,
          accountNumber: accountNumber,
          accountComments: accountComments,
          accountName: accountName,
          contractHash: contractHash,
          localCurrencyAmount: localCurrencyVal || 0,
          transactionFee: transactionfee || 0,
          Tokens: inputZKToken || 0,
        };
        const storeSellTokenPromise = storesSellToken(values);
        toast.promise(storeSellTokenPromise, {
          loading: "Creating...",
          success: <b>Sell Tokens request sent Successfully</b>,
          error: <b>Error Occured While Sending Request</b>,
        });
        await storeSellTokenPromise;

        // Clear fields and remove from local storage
        setSellerMetamask("");
        setPurchaserName("");
        setAccountNumber("");
        setAccountComments("");
        setAccountName("");
        setContractHash("");
        localStorage.removeItem("sellerMetamask");
        localStorage.removeItem("purchaserName");
        localStorage.removeItem("accountNumber");
        localStorage.removeItem("accountComments");
        localStorage.removeItem("accountName");
        localStorage.removeItem("contractHash");

        // Redirect after successful submission
        navigate(`/sellTokens-reciept/${purchaserName}`);
      } catch (error) {
        console.error("Error submitting Selling Token Data:", error);
        toast.error("Error Occured While Submitting Sell Token Data");
      }
    },
  });

  return (
    <>
      <BreadCrumb
        parentPageLink="/"
        ParentPage="Home"
        pageName="Sell ZK-Tokens"
        ChildPage="Sell ZK Tokens"
        imageUrl={sellTokens}
      />
      <div className=" pt-2 px-5">
        <div className="row pt-5 pb-5">
          <div className="col-xl-6 col-lg-6 col-md-6 displayNone centerDiv d-flex justify-content-center align-items-center">
            <img
              className="RegisterationImage"
              src={buyToken}
              alt="Girl Registering Her Account"
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <form onSubmit={formik.handleSubmit}>
              <p
                style={{ fontSize: "x-large", fontWeight: "bold" }}
                className=""
              >
                Sell ZK-Tokens
              </p>
              <input
                required
                className="InputReg mt-4"
                type="text"
                placeholder="Enter Your Meta Mask Wallet Address"
                value={sellerMetamask || ""}
                onChange={(e) =>
                  setSellerMetamask(
                    String((e.target as HTMLInputElement).value)
                  )
                }
              />
              <input
                required
                className="InputReg mt-4"
                type="text"
                placeholder="Enter ZK-Token Purchaser User Name"
                value={purchaserName || ""}
                onChange={(e) =>
                  setPurchaserName(String((e.target as HTMLInputElement).value))
                }
              />
              <p>
                <span className="link-wrapper">
                  <Link
                    className="link hover-2 fw-bold "
                    style={{ letterSpacing: "1px" }}
                    to="/zkt-purchasers"
                  >
                    {" "}
                    View ZK-Token Purchasers
                  </Link>
                </span>
              </p>
              <input
                required
                className="InputReg mt-4"
                style={{ width: "60%", borderRadius: "0px" }}
                type="text"
                placeholder="Enter Your Local  Bank Account Number "
                value={accountNumber || ""}
                onChange={(e) =>
                  setAccountNumber(String((e.target as HTMLInputElement).value))
                }
              />
              <select
                required
                className="InputReg border border-secondary"
                style={{ width: "40%", borderRadius: "0px" }}
                value={accountName || ""}
                onChange={(e) => setAccountName(e.target.value)}
              >
                <option>Select Bank Name</option>
                <option value="jazz_cash">Jazz Cash</option>
                <option value="easy_paisa">Easy Paisa</option>
                <option value="hbl">HBL</option>
              </select>
              <textarea
                required
                className="InputReg mt-4"
                placeholder="Add important comments e.g., Account title"
                value={accountComments || ""}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setAccountComments(e.target.value)
                }
              ></textarea>
              <div className="mt-4">
               {/*} CurrencyConversion commented in file:"BuyTokens" to save api
                free trial*/}
                <ZkTokenConversion onDataUpdate={handleDataUpdate} />
              </div>
              <div
                className="mt-4 d-flex align-items-center justify-content-left"
                data-toggle="tooltip"
                data-placement="top"
                title="Click on ZK Token Purchaser Name to  view its metamask account "
              >
                <div className="">Enter Contract Hash for transaction</div>
                <div className="mx-1">
                  <IoInformationCircle className="information" />
                </div>
              </div>
              <input
                className="InputReg recieptChose"
                required
                type="text"
                value={contractHash || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setContractHash(e.target.value)
                }
                placeholder="Attach Contract Hash"
              />
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
export default SellTokens;
