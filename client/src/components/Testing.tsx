import "../css/Testing.css";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import ImportingTokensModal from "./subSections/ImportingTokensModal";

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
  <ImportingTokensModal/>

      
    </>
  );
};

export default Testing;
