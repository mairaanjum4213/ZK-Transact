import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import { getUser } from "../../helper/helper";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

export default function Fees() {
  const [selectedOption, setSelectedOption] = useState("1");
  const [userData, setUserData] = useState<any>();
  const token = localStorage.getItem("token");
  const decodedToken: any = token ? jwtDecode(token) : {};
  const username = decodedToken.username || "";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const updateFee = async () => {
    try {
      const userId = userData?._id;
      const response = await axios.put("/api/merchant/fee", {
        userId,
        fee: selectedOption,
      });

      if (response.data.success) {
        toast.success("Fee set successfully");
      } else {
        console.error("Failed to update fee");
      }
    } catch (error) {
      console.error("Error updating fee:", error);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="container mt-5">
        <p
          style={{
            fontSize: "x-large",
            fontWeight: "bold",
            letterSpacing: "2px",
          }}
          className=""
        >
          Merchant Fee
        </p>
        <p className="my-2">Select your fee percentage transaction approval.</p>
        <main className="grid my-3 place-items-center  ">
          <div className="grid w-full lg:w-[40rem] grid-cols-5 gap-2 rounded-xl bg-gray-200 p-2 ">
            <div>
              <input
                type="radio"
                name="option"
                id="1"
                value="1"
                className="peer hidden"
                checked={selectedOption === "1"}
                onChange={handleChange}
              />
              <label
                htmlFor="1"
                className="block cursor-pointer select-none rounded-xl   dark:text-black p-2 text-center peer-checked:bg-primaryColor peer-checked:font-bold peer-checked:text-white"
              >
                1
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="option"
                id="2"
                value="2"
                className="peer hidden"
                checked={selectedOption === "2"}
                onChange={handleChange}
              />
              <label
                htmlFor="2"
                className="block cursor-pointer select-none rounded-xl p-2   dark:text-black text-center peer-checked:bg-primaryColor peer-checked:font-bold peer-checked:text-white"
              >
                2
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="option"
                id="3"
                value="3"
                className="peer hidden"
                checked={selectedOption === "3"}
                onChange={handleChange}
              />
              <label
                htmlFor="3"
                className="block cursor-pointer select-none rounded-xl p-2  dark:text-black  text-center peer-checked:bg-primaryColor peer-checked:font-bold peer-checked:text-white"
              >
                3
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="option"
                id="4"
                value="4"
                className="peer hidden"
                checked={selectedOption === "4"}
                onChange={handleChange}
              />
              <label
                htmlFor="4"
                className="block cursor-pointer select-none rounded-xl p-2  dark:text-black text-center peer-checked:bg-primaryColor peer-checked:font-bold peer-checked:text-white"
              >
                4
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="option"
                id="5"
                value="5"
                className="peer hidden"
                checked={selectedOption === "5"}
                onChange={handleChange}
              />
              <label
                htmlFor="5"
                className="block cursor-pointer select-none rounded-xl p-2  dark:text-black text-center peer-checked:bg-primaryColor peer-checked:font-bold peer-checked:text-white"
              >
                5
              </label>
            </div>
          </div>
        </main>
        <button
          onClick={updateFee}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Set Fee
        </button>
      </div>
    </>
  );
}
