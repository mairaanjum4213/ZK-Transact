import "../css/WalletDetails.css";
import BreadCrumb from "./BreadCrumb";
import breadCrumWallet from "../assets/BreadCrumbs/ImportTokens.png";
import { HiOutlineRefresh } from "react-icons/hi";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdOutlineContentCopy } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { useBlockNumber } from "wagmi";
import { useAccount, useEnsName, useBalance } from "wagmi";
import React from "react";
import metamask from "../assets/metamask.png";
import { jwtDecode } from "jwt-decode";
import { getUser } from "../helper/helper";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

const WalletDetails: React.FC = () => {
  const { isConnected } = useAccount();
  const handleCopyToClipboardWalletAddresss = () => {
    toast.success("Wallet Address Copied");
  };
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data } = useBlockNumber({ watch: true });
  const { data: balance, refetch } = useBalance({
    address,
    watch: true,
  });
  const [walletAddress, setWalletAddress] = useState("SetUseState");
  useEffect(() => {
    {
      ensName ?? address;
    }
    {
      ensName ? ` (${address})` : null;
    }
    const updatedAddress = address ?? "Default Address";
    setWalletAddress(updatedAddress);
  }, [address]);

  const handleNetworkSwitch = async (id: number, name: string) => {
    try {
      if (switchNetwork) {
        await switchNetwork(id);
        toast.success(`Switching to ${name}`);
      }
    } catch (err) {}
  };

  const [metamaskAddress, setMetamaskAddress] = useState("");
  const zkTokens = balance?.formatted;
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

  /*const handleAddWallet = async () => {
    try {
      const response = await axios.post("/api/wallet", {
        metamaskAddress,
        zkTokens
      });
      const createdWalletId = response.data.wallet._id; // Get the created account id
      assignWalletToUser(createdWalletId); // Automatically assign account to user
      toast.success("Wallet Details added!");
    } catch (error) {
      toast.error("Problem adding wallet details.");
    }
  };*/

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  // Other code

  const handleAddWallet = async () => {
    try {
      setIsButtonClicked(true); // Disable the button

      // Check if user already has a wallet
      if (userData.wallet) {
        toast.error("You cannot add multiple wallets.");
        setIsButtonClicked(false); // Enable the button
        return;
      }

      const response = await axios.post("/api/wallet", {
        metamaskAddress,
        zkTokens,
      });
      const createdWalletId = response.data.wallet._id; // Get the created account id
      assignWalletToUser(createdWalletId); // Automatically assign account to user
      toast.success("Wallet Details added!");
    } catch (error) {
      toast.error("Problem adding wallet details.");
    } finally {
      setIsButtonClicked(false); // Enable the button
    }
  };

  const assignWalletToUser = async (walletId: string) => {
    try {
      await axios.put(`/api/users/${userData._id}/wallet/${walletId}`);
    } catch (error) {
      toast.error("Problem while adding wallet ");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <BreadCrumb
        parentPageLink="/user"
        ParentPage="Home"
        pageName="Wallet Detials"
        ChildPage="Wallet Detials"
        imageUrl={breadCrumWallet}
      />
      <section className="">
        <div className="container  mb-5">
          <h1 className="fw-bold fs-4 my-5" style={{ letterSpacing: "1px" }}>
            Crypto Wallet Details
          </h1>

          {isConnected ? (
            <>
              <div
                className="row d-flex justify-content-center align-items-center mt-5 mx-2 px-1"
                data-aos="zoom-in"
              >
                <div className="col col-lg-6 mb-4 mb-lg-0    ">
                  <div
                    className="adminProfileCard mb-3 "
                    style={{ borderRadius: ".5rem" }}
                  >
                    <div className="row g-0">
                      <div
                        className="col-md-4 gradient-custom text-center text-white d-flex justify-content-center align-items-center flex-column"
                        style={{
                          borderTopLeftRadius: ".5rem",
                          borderBottomLeftRadius: ".5rem",
                        }}
                      >
                        <img
                          src={metamask}
                          alt="Avatar"
                          className="img-fluid my-4"
                        />
                        <h5 className=" fs-4">Meta Mask </h5>
                        <p className="text-secondary my-2">Wallet</p>
                      </div>
                      <div className="col-md-8">
                        <div className="card-body px-4 pb-4 pt-lg-4">
                          <p
                            className="fs-4 fw-bold mt-2  mb-2"
                            style={{ letterSpacing: "2px" }}
                          >
                            Details
                          </p>
                          <hr className="mt-0 mb-4" />
                          <div className="row pt-1">
                            <div className="col-12 mb-3">
                              <h6>
                                Wallet Address
                                <CopyToClipboard text={walletAddress}>
                                  <MdOutlineContentCopy
                                    onClick={
                                      handleCopyToClipboardWalletAddresss
                                    }
                                    className=" UsernameCopyicon mx-2"
                                    style={{ display: "inline" }}
                                  />
                                </CopyToClipboard>
                              </h6>
                              <input
                                className="bg-transparent outline-0 w-100 text-secondary "
                                type="text"
                                value={walletAddress}
                              />
                            </div>
                          </div>
                          <div className="row pt-1">
                            <div className="col-7 mb-3">
                              <h6>Bal. </h6>
                              <p className="text-secondary">
                                {" "}
                                {balance?.formatted}
                              </p>
                              <span className=" d-flex align-items-center justify-content-start">
                                <p className="copyIcon fs-6  ">
                                  {balance?.symbol}
                                </p>
                                <HiOutlineRefresh
                                  className="UsernameCopyicon mx-1 fs-5 "
                                  onClick={() => refetch()}
                                />
                              </span>
                            </div>
                            <div className="col-5 mb-3">
                              <h6>Block Number</h6>
                              <p className="text-secondary mt-1">
                                {" "}
                                {data?.toString()}
                              </p>
                            </div>
                          </div>
                          <div className="row pt-1">
                            <div className="col-7 mb-3">
                              <h6>Connected To</h6>
                              <p className="text-secondary mt-3">
                                {" "}
                                {chain?.name ?? chain?.id}
                              </p>
                            </div>
                            <div className="col-5 mb-3">
                              <h6>Switch To</h6>
                              {chains.map((x) =>
                                x.id === chain?.id ? null : (
                                  <button
                                    key={x.id}
                                    onClick={() =>
                                      handleNetworkSwitch(x.id, x.name)
                                    }
                                    className="simpleButton1 mt-2"
                                  >
                                    {"" + x.name}
                                    {isLoading &&
                                      x.id === pendingChainId &&
                                      " .."}
                                  </button>
                                )
                              )}
                            </div>
                          </div>
                          <p
                            className="text-justify error  text-danger"
                            style={{ fontSize: "x-small" }}
                          >
                            {error?.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-left font-bold text-red-500 text-lg">
              Please Connect the wallet first.
            </p>
          )}
        </div>
      </section>

      {/*   Add metamask details*/}

      <div className="mx-auto flex  w-full lg:w-6/12 ">
        <div className=" w-full  my-8 p-4 accountsCard rounded-xl">
          <h1 className="text-xl font-bold mb-4">Add Metamask Details </h1>
          <div className="mb-4">
            <label className="block mb-2">Metamask Address:</label>
            <input
              type="text"
              name="bankName"
              value={metamaskAddress}
              onChange={(e) => setMetamaskAddress(e.target.value)}
              className="w-full border border-gray-700 rounded-md py-2 px-2 focus:outline-none focus:border-blue-400"
              placeholder=" Copy the metamask address here from above and paste here"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">ZK Tokens:</label>
            <input
              required
              type="text"
              name="accNumber"
              value={zkTokens}
              className="w-full border border-gray-700 rounded-md py-2 px-2 focus:outline-none focus:border-blue-400"
            />
          </div>
          <button
            type="submit"
            onClick={handleAddWallet}
            disabled={isButtonClicked} // Disable button if isButtonClicked is true
            className="standarButton-1"
          >
            {isButtonClicked ? "Adding Wallet..." : "Add Wallet"}
          </button>
        </div>
      </div>
    </>
  );
};
export default WalletDetails;
