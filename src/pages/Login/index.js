import { useState } from "react";
import "./style.css";
import { InputOtp } from "primereact/inputotp";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Login() {
  const [token, setTokens] = useState();
  const [step, setStep] = useState("signin");


  

  return (
    <div className="formLayout">
      <div
        className={`innerForm innerFormborder signIn ${
          step === "signin" ? "active" : "hidden"
        }`}
      >
        <div className="formHeading">
          <img src="appIcon.png" alt="icon" />
          <p>Sign In</p>
        </div>
        <div className="formBody">
          <input
            className="padding"
            type="text"
            id="name"
            name="email"
            autoComplete="off"
            placeholder="Email or Phone number"
          />
          <br />
          <input
            className="padding"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password" 
          />
          <br />
          <button
            className="signButton padding marginTopSign"
            onClick={() => setStep("verify")}
          >
            Sign In
          </button>
          <br />
          <p className="forgotP">Forgot Password</p>
        </div>
      </div>

      <div
        className={`innerForm verifyOtp ${
          step === "verify" ? "active" : "hidden"
        }`}
      >
        <div className="verifyOtpHeader">
          <img
            src="images/backButton.png"
            alt="back"
            onClick={() => setStep("signin")}
            style={{ cursor: "pointer" }}
          />
          <img src="images/close.png" style={{ cursor: "pointer" }} alt="close" onClick={() => setStep("signin")} />
        </div>
        <div className="verifyOtpBody">
          <img src="images/Envelope.png" alt="mail" />
          <div className="midBody">
            <h5>Check your inbox</h5>
            <div style={{ textAlign: "center" }}>
              <p>Please open the link in the email to continue or </p>
              <p>Enter the verification code we sent to</p>
              <InputOtp
                value={token}
                onChange={(e) => setTokens(e.value)}
              />
            </div>
            <span className="resendClass">Resend (60s)</span>
          </div>
          <button className="signButton padding marginTop">Verify Code</button>
        </div>
      </div>
    </div>
  );
}
