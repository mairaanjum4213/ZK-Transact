import React, { useState, ChangeEvent, useEffect } from "react";
import BreadCrumb from "./BreadCrumb";
import KYC from "../assets/KYC.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { getUser, storekyc } from "../helper/helper";
import { jwtDecode } from "jwt-decode";

const KycForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fullName, setFullName] = useState("");
  const [nationality, setNationality] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const token = localStorage.getItem("token");
  const decodedToken: any = token ? jwtDecode(token) : {};
  const username = decodedToken.username || "";
  const [userData, setUserData] = useState<any>("");

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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFile(file);
    } else {
      console.error("Please select a PNG file.");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {},

    onSubmit: async () => {
      if (!file) return;

      try {
        const formData = new FormData();
        formData.append("user", userData._id);
        formData.append("name", fullName);
        formData.append("dob", dateOfBirth);
        formData.append("gender", gender);
        formData.append("nationality", nationality);
        formData.append("nationalIdentity", file);

        const storekycPromise = storekyc(formData);
        toast.promise(storekycPromise, {
          loading: "Creating...",
          success: <b>KYC request sent Successfully...!</b>,
          error: <b>Error occurs while sending KYC request.</b>,
        });
        await storekycPromise;
        setFullName("");
        setDateOfBirth("");
        setGender("");
        setNationality("");
        setFile(null);
      } catch (error) {
        console.error("Error submitting kyc data:", error);
        toast.error("Error submitting kyc data. Please try again later.");
      }
    },
  });

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <BreadCrumb
        parentPageLink="/user"
        ParentPage="Home"
        pageName="KYC "
        ChildPage="KYC Form"
        imageUrl={KYC}
      />
      <div className="container py-5">
        <h2 className="fw-semibold tracking-wide">KYC Information</h2>

        <p className="tracking-wide text-lg my-2">
          We respect our customer privacy your information will be keept privtae
        </p>

        <p>Kyc Status : 'In case usna bji we request'</p>

        <div className="container mt-4">
          <div className="row pb-5">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <form
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
                method="POST"
              >
                <input
                  className="InputReg recieptChose"
                  type="file"
                  placeholder="Upload Your National Identitys"
                  name="nationalIdentity"
                  accept=".png"
                  onChange={handleFileChange}
                />
                {file && <p>Selected File: {file.name}</p>}{" "}
                <input
                  className="InputReg my-2"
                  type="text"
                  placeholder="Enter Your  Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <input
                  className="InputReg my-2"
                  type="text"
                  placeholder=" Enter Your Nationality"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                />
                <input
                  className="InputReg my-2"
                  type="date"
                  placeholder=" Enter Date of Birth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
                <input
                  className="InputReg my-2"
                  type="text"
                  placeholder=" Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
                <button
                  type="submit"
                  className="standarButton-1 mt-2"
                  style={{ minWidth: "fit-content" }}
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 displayNone d-flex justify-content-center align-items-center"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default KycForm;
