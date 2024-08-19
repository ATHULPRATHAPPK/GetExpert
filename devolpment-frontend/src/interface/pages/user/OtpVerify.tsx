import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import OtpInput from "../../components/OtpInput";
import Spinner from "../../components/Spinner";
import { verifyOtp } from "../../../application/service/user/authService";

const OtpVerificationPage: React.FC = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerifyClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    const email = location.state?.email || "abcd@gmail.com";

    if (enteredOtp.length === 4 && email) {
      setIsLoading(true);
      setErrorMessage(null);
      const delay = 1500;
      const startTime = new Date().getTime();
      try {
        console.log("Verifying OTP...");
        const response = await verifyOtp(enteredOtp, email);
        console.log("OTP Verified:", response);

        // Ensure loader is shown for at least 1.5 second
        setTimeout(() => {
          const elapsedTime = new Date().getTime() - startTime;
          const remainingTime = delay - elapsedTime;
          if (remainingTime > 0) {
            setTimeout(() => {
              setIsLoading(false);
              navigate("/login",{state :{message:response}});
            }, remainingTime);
          } else {
            setIsLoading(false);
            navigate("/login",{state :{message:response}});
          }
        }, delay);
      } catch (error) {
        console.error("OTP verification failed:", error);
        setTimeout(() => {
          const elapsedTime = new Date().getTime() - startTime;
          const remainingTime = delay - elapsedTime;
          if (remainingTime > 0) {
            setTimeout(() => {
              setIsLoading(false);
              setErrorMessage("OTP verification failed. Please try again.");
            }, remainingTime);
          } else {
            setIsLoading(false);
            setErrorMessage("OTP verification failed. Please try again.");
          }
        }, delay);
      }
    } else {
      console.error("Invalid OTP or email");
    }
  };

  const handleResendOtp = () => {
    if (resendTimer === 0) {
      console.log("Resend OTP");
      setResendTimer(30);
    }
  };

  const focusNextInput = (index: number) => {
    if (index < 4 && inputRefs.current[index]) {
      inputRefs.current[index]?.focus();
    }
  };

  return (
    <div className="relative flex flex-col lg:flex-row h-screen bg-gray-50">
      <div className="hidden lg:flex flex-col items-center justify-center lg:w-1/2 w-full bg-orange-100">
        <img src="path_to_your_image" alt="GetExpert" className="w-1/2 mb-8" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-md w-11/12 lg:w-[28rem]">
          <h1 className="text-3xl font-bold mb-6">OTP Verification</h1>
          <p className="text-center text-sm text-gray-500 mb-4">
            {location.state?.message}
          </p>
          {errorMessage && (
            <p className="text-center text-sm text-red-500 mb-4">
              {errorMessage}
            </p> // Display the error message
          )}
          <form onSubmit={handleVerifyClick}>
            <div className="flex justify-center mb-4">
              {otp.map((digit, index) => (
                <OtpInput
                  key={index}
                  value={digit}
                  onChange={(value) => handleChange(value, index)}
                  index={index}
                  focusNextInput={focusNextInput}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
            </div>
            <div className="flex justify-between items-center mb-4">
              <Button text="Verify" className="w-full" />
            </div>
          </form>
          <div className="text-center">
            {isLoading ? (
              <Spinner /> // Display loader when loading
            ) : (
              <>
                {resendTimer > 0 ? (
                  <p className="text-sm text-gray-500">
                    Resend OTP in {resendTimer} seconds
                  </p>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    className="text-sm text-orange-500"
                  >
                    Resend OTP
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
