import "../css/Testing.css";
import { useState, useEffect } from "react";
import Loader from "./Loader";

const Testing: React.FC = () => {
  const [text1, setText1] = useState(20);
  const [text2, setText2] = useState("");
  const [country1, setCountry1] = useState({});
  const [value1, setValue1] = useState(0);
  const [zkToken, setZkToken] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await fetch(
        "http://data.fixer.io/api/latest?access_key=33bfa7f34370ffa5be93be5533578594"
      );

      const result = await response.json();
      setCountry1(result.rates);
    
      const zkRate = result.rates.USD;
      setZkToken(zkRate);
      setIsLoading(false); 
    } catch (error) {
      alert(`Error fetching data: ${error}`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  
  const handleValue1Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrencyRate2 = Number(event.target.value);
    setValue1(selectedCurrencyRate2);
  };

  const convert = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    let num = (zkToken / value1) * text1;
    let roundedNum = parseFloat(num.toFixed(5));
    setText2(roundedNum.toString());
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <form>
          <input
            type="number"
            autoComplete='false'
            value={text1}
            onChange={(e) => setText1(Number((e.target as HTMLInputElement).value))}
          />
          <select onChange={handleValue1Change}>
            <option>Select a country</option>
            {Object.keys(country1).map((data, index) => (
              <option key={index} value={(country1 as Record<string, number>)[data]}>
                {data}
              </option>
            ))}
          </select>
          <br /> <br />
          <input
            type="number"
            autoComplete='false'
            value={text2}
            disabled
            onChange={(e) => setText2(e.target.value)}
          />
          <select disabled>
            <option>ZK-Tokens</option>
          </select>
          <br /> <br />
          <button
            className="btnStyle"
            onClick={convert}
            type="submit"
            disabled={!value1} 
          >
            Convert
          </button>
        </form>
      )}


      
    </>
  );
};

export default Testing;
