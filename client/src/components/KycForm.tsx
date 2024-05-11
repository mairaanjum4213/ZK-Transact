import React, { useState, ChangeEvent } from 'react';
import BreadCrumb from './BreadCrumb';
import KYC from '../assets/KYC.png';

const KycForm: React.FC = () => {
  const [nationalIdentity, setNationalIdentity] = useState<File | null>(null);
  const [fullName, setFullName] = useState('');
  const [nationality, setNationality] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setNationalIdentity(file);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', {
      nationalIdentity,
      fullName,
      nationality,
      dateOfBirth,
      gender
    });
  };

  return (
    <>   

      <BreadCrumb parentPageLink='/user' ParentPage="Home" pageName="KYC " ChildPage="KYC Form" imageUrl={KYC} /> 
     <div className='container py-5'>
        <h2 className='fw-semibold tracking-wide'>
            KYC Information
        </h2>
    
        <p className='tracking-wide text-lg my-2'>
            We respect our customer privacy your information will be keept privtae 
        </p>
    
        <p>Kyc Status : 'In case usna bji we request'</p>
    
        <div className="container mt-4">
            <div className="row pb-5">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
        
                <form onSubmit={handleSubmit}>
    
                <input
                    className="InputReg recieptChose"
                    type="file"
                    placeholder="Upload Your National Identitys"
                    name="NationalIdentity"
                    accept=".png"
                    onChange={handleFileChange}
                />
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
    
                <button type="submit" className="standarButton-1 mt-2" style={{minWidth:"fit-content"}}>
                    Submit
                </button>
                </form>
            
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 displayNone d-flex justify-content-center align-items-center">
                {/* <img
                className="RegisterationImage"
                src={login}
                alt="Girl Registering Her Account"
                /> */}
            </div>
            </div>
        </div>
     </div>
    </>
  );
};
export default KycForm;
