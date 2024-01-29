import { useState } from "react";

import "./loginStyle.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import parsePhoneNumber from 'libphonenumber-js';
function Login() {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [showOtpSection,setShowOtpSection]=useState(false)

  const handlePhoneInput = (value: string) => {
    setPhoneNumber(value);
  };
//VALIDATE PHONE NUMBER
const handleValidContact = () => {
  try {
    if (phoneNumber) {
      const phoneNumberObject = parsePhoneNumber(phoneNumber, 'IN');
      return phoneNumberObject?.isValid();
    }
    return false;
  } catch (error) {
    return false;
  }
};
    
//HANDLE CONTINUE BUTTON
const handleContinueButton=()=>{
  if(handleValidContact()){
    setShowOtpSection(true)}
    else{
     alert("Invalid Phone Number")
    }
  }

  const [otp, setOtp] = useState<string | undefined>(undefined);
  // React.ChangeEvent<HTMLInputElement> to define a TYPE for event e here input is changing event so htmlinputelement is used
  const handleOtp = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = event.target.value.replace(/\D/g, "");
    //   /D/ to identify all non 0 to 9 strings
    //   /g for global checking entinerly restrict any string to get entered
    setOtp(numericValue);
  };
  const verifyOtp = () => {
    const answer = otp !== undefined ? otp.replace(/\D/g, "") : "";
    if (answer !== otp) {
      alert("wrong");
    } else {
      alert("right");
    }
  };
  return (
    <>
     
      <div className="flex flex-col justify-center items-center mt-40">
        <div className="childDiv h-72 w-96 rounded-md shadow-md">
          <h1 className="font-bold text-lg text-white mb-10 mt-4 ml-3 text-left">Login or Signup</h1>
          {!showOtpSection?(
            <>
          <div className="ml-4">
            <PhoneInput
              country={"in"}
              value={phoneNumber}
              onChange={handlePhoneInput}
              inputStyle={{ width: "95%", padding: "0.75rem", fontSize: "1rem"}} />
             <p className="text-sm mt-2 text-gray-600 mb-4">
              By continuing, I agree to the <span className="text-red-700">Terms & Conditions</span>
            </p>
       
          </div>  
             <button
              className="bg-customColor hover:bg-customColor-hover
             text-white font-bold py-2 px-4 rounded-full mb-4" 
             onClick={handleContinueButton}>
              Continue
            </button> </>
          ):(
            <>
            <br/>
          <input
            value={otp}
            type="text"
            placeholder="Enter OTP"
            className="col-15 col-lg-auto mb-3 mb-lg-0 me-lg-3 px-2"
            onChange={handleOtp}
          />
       <br/>
          <button
            onClick={verifyOtp}
            className="bg-customColor hover:bg-customColor-hover
             text-white font-bold py-2 px-4 rounded-full"
          >
            Submit
          </button>
          </>)}
        </div>
      </div> 
     </>
   
  );
}

export default Login;
