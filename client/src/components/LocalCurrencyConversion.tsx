import React, { useState, useEffect } from 'react';
import '../css/Registration.css';

import Loader from './Loader';
import { Toaster, toast } from 'react-hot-toast';
const LocalCurrencyConversion: React.FC = () => {
  const [LocalCurrencyVal, setLocalCurrencyVal] = useState<number>();
  const [zkTokenVal, setzkTokenVal] = useState<string>("");
  const [country1, setCountry1] = useState<Record<string, number>>({});
  const [userInputLocalVal, setUserInputLocalVal] = useState<number>(0);
  const [zkTokenUniversal, setZkTokenUniversal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const a =102;
  
  const getData = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_FIXER_IO
      );
      const result = await response.json();
      setCountry1(result.rates);
      const zkRate = result.rates.USD;
      setZkTokenUniversal(zkRate);
      setIsLoading(false);
    } catch (error) {
      toast.error(`Error fetching data: ${error}`);
      console.log("FIXERR IO API KEY ERROR")
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
    if (LocalCurrencyVal && LocalCurrencyVal < 0) {
      toast.error("💵 Currency cannot be negative");
    }
  }, [LocalCurrencyVal]);
  const handleLocalCuurencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrencyRate2 = Number(event.target.value);
    setUserInputLocalVal(selectedCurrencyRate2);
  };
  const convert = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let num = (zkTokenUniversal / userInputLocalVal) * LocalCurrencyVal!;
    let roundedNum = parseFloat(num.toFixed(5));
    setzkTokenVal(roundedNum.toString());
  };


  try {
  return (
    <>
      <Toaster />
      {isLoading ? (
        <Loader />
      ) : (
        <form>
          <input
            type="number"
            className="InputReg"
            autoComplete='false'
            step={100}
            style={{ width: "60%" }}
            placeholder="Enter Local Currency Amount"
            value={LocalCurrencyVal || ''}
            onChange={(e) => setLocalCurrencyVal(Number((e.target as HTMLInputElement).value))}
          />
          {/* local currency */}
          <select
            className="InputReg   border-secondary  "
            style={{ width: "40%" }}
            onChange={handleLocalCuurencyChange}>
            <option >Select Your Local Currency</option>
            {Object.keys(country1).map((data, index) => (
              <option  key={index} value={(country1 as Record<string, number>)[data]}>
                {data}
              </option>
            ))}
          </select>


          <input
            className="InputReg mt-4 "
            style={{ width: "40%", borderRadius: "0px" }}
            type="number"
            placeholder={"ZK Token Seller Fee : "+a+" % " }
            autoComplete='false'
            // value={a}
            disabled
          /> <br />

        
          <button
            className="btnStyle my-4 "
            onClick={convert}
            type="submit"
            disabled={!userInputLocalVal || (LocalCurrencyVal && LocalCurrencyVal < 0)}
          >
            Convert
          </button>


          <hr />
          <input
            className="InputReg mt-4"
            style={{ width: "60%", borderRadius: "0px" }}
            type="number"
            placeholder=" Equivalent ZKT Amount "
            autoComplete='false'
            value={zkTokenVal}
            disabled
          />
          {/* Equivalent ZKT Tokens*/}
          <select disabled
            className="InputReg text-center  hideSelectIcon  "
            style={{ width: "40%", borderRadius: "0px" }}>
            <option>ZKT's</option>
          </select>
        </form>
      )}
    </>
  );}
  catch(e){
    console.log("Check Expiry of Fixer.io --Local Currency Conversion Component")
  }
};
export default LocalCurrencyConversion;
