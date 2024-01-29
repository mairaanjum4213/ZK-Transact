import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import { toast, Toaster } from 'react-hot-toast';
const ZkTokenConversion: React.FC = () => {
  const [text1, setText1] = useState<number>(0);
  const [localCurrencyVal, setLocalCurrencyVal] = useState<string>("");
  const [country1, setCountry1] = useState<Record<string, number>>({});
  const [inputZkTokens, setInputZkTokens] = useState<number>(0);
  const [zkTokenUniversalVal, setZkTokenUniversalVal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const getData = async () => {
   
   
   
    try {
      const response = await fetch(
        import.meta.env.VITE_FIXER_IO
      );
      const result = await response.json();
      setCountry1(result.rates);
      const zkRate = result.rates.USD;
      setZkTokenUniversalVal(zkRate);
      setIsLoading(false);
    } catch (error) {
      toast.error(`Error fetching data: ${error}`);
      console.log(" FIXER IO API KEY ERROR")
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
    if (text1 < 0) {
      toast.error("💰 ZK-Tokens cannot be negative");
    }
  }, [text1]);
  const zkTokenValChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrencyRate2 = Number(event.target.value);
    setInputZkTokens(selectedCurrencyRate2);
  };
  const convert = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let num = (inputZkTokens / zkTokenUniversalVal) * text1;
    let roundedNum = parseFloat(num.toFixed(5));
    setLocalCurrencyVal(roundedNum.toString());
  };

  try{
  return (
    <>
      <Toaster />
      {isLoading ? (
        <Loader />
      ) : (
        <form>
          <input
            className="InputReg mt-4"
            style={{ width: "60%", borderRadius: "0px" }}
            placeholder="ZKT Amount"
            type="number"
            autoComplete='false'
            value={text1}
            step={100}
            onChange={(e) => setText1(Number((e.target as HTMLInputElement).value))}
          />
          <select disabled
            className="InputReg text-center  hideSelectIcon"
            style={{ width: "40%", borderRadius: "0px" }}
          >
            <option>ZK-Tokens</option>
          </select>
          <input
            className="InputReg mt-4"
            style={{ width: "60%", borderRadius: "0px" }}
            placeholder=" Equivalent Local Currency Amount"
            type="number"
            autoComplete='false'
            disabled
            value={localCurrencyVal}
          />
          <select
            className="InputReg  border border-secondary"
            style={{ width: "40%", borderRadius: "0px" }}
            onChange={zkTokenValChange}>
            <option>Select Currency</option>
            {Object.keys(country1).map((data, index) => (
              <option key={index} value={(country1 as Record<string, number>)[data]}>
                {data}
              </option>
            ))}
          </select>
          <button
            className="btnStyle  mt-4"
            onClick={convert}
            type="submit"
            disabled={!inputZkTokens || (text1 < 0)}
          >
            Convert
          </button>
        </form>
      )}
    </>
  );
}
catch(e){
  console.log("Check Expiry of Fixer.io --ZK Token Conversion Component")
}
};
export default ZkTokenConversion;
