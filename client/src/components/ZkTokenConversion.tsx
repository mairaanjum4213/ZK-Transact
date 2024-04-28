
import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import { toast, Toaster } from 'react-hot-toast';

interface ZkTokenConversionProps {
  onDataUpdate: (roundedNum: number, inputZKToken: number, transactionFee:number) => void;
  merchantFee: number;
}

const ZkTokenConversion:React.FC<ZkTokenConversionProps> = ({ onDataUpdate, merchantFee }) => {
  const [inputZKToken, setText1] = useState<number>();
  const [transactionfee, settransactionfee] = useState<number>(merchantFee);
  const [localCurrencyVal, setLocalCurrencyVal] = useState<number>();
  const [country1, setCountry1] = useState<Record<string, number>>({});
  const [inputZkTokens, setInputZkTokens] = useState<number>();
  const [zkTokenUniversalVal, setZkTokenUniversalVal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const a = 10
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
    if (inputZKToken < 0) {
      toast.error("💰 ZK-Tokens cannot be negative");
    }
  }, [inputZKToken]);
  const zkTokenValChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrencyRate2 = Number(event.target.value);
    setInputZkTokens(selectedCurrencyRate2);
  };
  const convert = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let num = (inputZkTokens / zkTokenUniversalVal) * inputZKToken;
    let feeAmount = num * (transactionfee / 100);
    let exchangedAmountAfterFee = num - feeAmount;
    let roundedNum = parseFloat(exchangedAmountAfterFee.toFixed(2));
    setLocalCurrencyVal(roundedNum);
    onDataUpdate(roundedNum,inputZKToken,transactionfee);

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
              className="InputReg mt-4"
              style={{ width: "6~0%", borderRadius: "0px" }}
              placeholder="ZKT Amount"
              type="number"
              required
              style={{ width: "60%" }}
              autoComplete='false'
              placeholder="Enter ZK Tokens Amount"
              value={inputZKToken}
              step={100}
              onChange={(e) => setText1(Number((e.target as HTMLInputElement).value))}
            />
             <select
              required
              className="InputReg  border border-secondary"
              style={{ width: "40%", borderRadius: "0px" }}
              onChange={zkTokenValChange}>
              <option>Select Local Currency</option>
              {Object.keys(country1).map((data, index) => (
                <option key={index} value={(country1 as Record<string, number>)[data]}>
                  {data}
                </option>
              ))}
            </select>
           
          <br />
            <input
              className="InputReg mt-4 "
              style={{ width: "40%", borderRadius: "0px" }}
              type="number"
              value={transactionfee}
              onChange={(e) => settransactionfee(Number((e.target as HTMLInputElement).value))}
              placeholder={"ZK Token Seller Fee : " + a + " % "}
              autoComplete='false'
              // value={a}
              disabled
            /> <br />
            <button
              className="btnStyle  mt-4"
              onClick={convert}
              type="submit"
              disabled={!inputZkTokens || (inputZKToken < 0)}
            >
              Convert
            </button>
            <hr  className="mt-4"/>
            <input
              className="InputReg mt-4"
              style={{borderRadius: "0px" }}
              placeholder=" Equivalent Local Currency Amount"
              type="number"
              autoComplete='false'
              disabled
              value={localCurrencyVal}
            />
          </form>
        )}
      </>
    );  
  }
  catch (e) {
    console.log("Check Expiry of Fixer.io --ZK Token Conversion Component")
  }
};
export default ZkTokenConversion;
