import React, { useState } from "react";
import logo1 from "../imgs/logo2.jpg";
import { useNavigate } from "react-router-dom";
import "./LoginStyles.css";

const Validator = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));

  const navigate = useNavigate();

  const handlChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  return (
    <section className="registerPage">
      <img className="regImg" src={logo1} alt="" />
      <div className="registerDetails"></div>
      <div className="registerDetails">
        <p style={{ textAlign: "center", fontWeight: "bold", paddingTop: 70 }}>
          Verify Your Account:
        </p>
        <p style={{ textAlign: "center" }}>
          We emailed you the 4 digit code to your email.
          <br />
          Enter the code below to confirm your email address.
        </p>
        <div className="otp-field-container">
          {otp.map((data, index) => {
            return (
              <input
                className="otp-field"
                type="number"
                name="otp"
                required
                max={9}
                min={0}
                maxLength={1}
                key={index}
                value={data}
                onChange={(e) => handlChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            );
          })}
        </div>
        <p>OTP Entered - {otp.join("")}</p>
        <button
          className="btn"
          onClick={(e) => setOtp([...otp.map((v) => "")])}
          style={{ margin: 2 }}
        >
          Clear
        </button>
        <button
          className="btn"
          //   disabled={( ? "offscreen" : "invalid")}
          onClick={() => navigate("/ResetPwd")}
          style={{ margin: 2 }}
        >
          {/* {{if(verify)
        onClick=(e) => alert("Entered OTP is " + otp.join(""))
        else() {() => navigate("/Opt")}
        }} */}
          verify
        </button>
        <p style={{ paddingTop: 15 }} onClick={() => navigate("/")}>
          I remembered the password!
        </p>
      </div>
    </section>
  );
};
export default Validator;
