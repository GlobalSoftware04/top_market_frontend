import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputOtp } from "primereact/inputotp";
import { motion, AnimatePresence } from "framer-motion";
import "./style.css";

export default function Login() {
    const [step, setStep] = useState("signin");
    const [otpValue, setOtpValue] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSignInSubmit = (data) => {
        console.log("Sign In Data:", data);
        setStep("verify"); // Move to OTP screen
    };

    const onVerifySubmit = () => {
        console.log("OTP Entered:", otpValue);
        alert("OTP Verified! 🚀");
    };

    // Motion variants for subtle fade
    const fadeVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.25 } },
        exit: { opacity: 1, transition: { duration: 0.25 } },
    };

    return (
        <div className="formLayout">
            <AnimatePresence mode="wait">
                {step === "signin" && (
                    <motion.form
                        key="signin"
                        className="innerForm innerFormborder signIn active"
                        onSubmit={handleSubmit(onSignInSubmit)}
                        autoComplete="off"
                        variants={fadeVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="formHeading">
                            <img src="appIcon.png" alt="icon" />
                            <p>Sign In</p>
                        </div>
                        <div className="formBody">
                            <div style={{ marginBottom: 16 }}>
                                <input
                                    className="padding"
                                    type="text"
                                    placeholder="Email or Phone number"
                                    {...register("email", { required: "Email / Phone is required" })}
                                    autoComplete="off"
                                />
                                {errors.email && <div className="error">{errors.email.message}</div>}
                            </div>
                            <div>
                                <input
                                    className="padding"
                                    type="password"
                                    placeholder="Password"
                                    {...register("password", { required: "Password is required" })}
                                    autoComplete="new-password"
                                />
                                {errors.password && <p className="error">{errors.password.message}</p>}
                            </div>
                            <button type="submit" className="signButton padding marginTopSign">
                                Sign In
                            </button>
                            <p className="forgotP">Forgot Password</p>
                        </div>
                    </motion.form>
                )}

                {step === "verify" && (
                    <motion.form
                        key="verify"
                        className="innerForm verifyOtp active"
                        onSubmit={handleSubmit(onVerifySubmit)}
                        variants={fadeVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="verifyOtpHeader">
                            <img
                                src="images/backButton.png"
                                alt="back"
                                onClick={() => setStep("signin")}
                                style={{ cursor: "pointer" }}
                            />
                            <img src="images/close.png" alt="close" />
                        </div>

                        <div className="verifyOtpBody">
                            <img src="images/Envelope.png" alt="mail" />
                            <div className="midBody">
                                <h5>Check your inbox</h5>
                                <p>Please open the link in the email to continue or</p>
                                <p>Enter the verification code we sent to</p>
                                <InputOtp value={otpValue} onChange={(e) => setOtpValue(e.value)} />
                                <span className="resendClass">Resend (60s)</span>
                            </div>

                            <button type="submit" className="signButton padding marginTop">
                                Verify Code
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}
