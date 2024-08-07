// src/interface/pages/user/OtpVerification.tsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import OtpInput from '../../components/OtpInput';

const OtpVerificationPage: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const navigate = useNavigate();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  const handleVerifyClick = () => {
    const enteredOtp = otp.join('');
    console.log('OTP Entered:', enteredOtp);
    if (enteredOtp.length === 4) {
      console.log('OTP Verified');
      navigate('/login'); 
    }
    navigate('/login'); 
  };

  const handleResendOtp = () => {
    if (resendTimer === 0) {
      console.log('Resend OTP');
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
          <form>
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
              <Button
                text="Verify"
                className="w-full"
                onClick={handleVerifyClick}
              />
            </div>
          </form>
          <div className="text-center">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
