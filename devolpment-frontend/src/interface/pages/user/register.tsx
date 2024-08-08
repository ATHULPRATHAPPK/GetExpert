// src/interface/pages/user/Register.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import "../../styles/index.css";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setLoading(true);
    // Simulate a registration process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);

    console.log("Register clicked");
    navigate("/otp-verification");
  };

  const handleGoogleSignInClick = () => {
    navigate("/login");
  };

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
    handleRegister();
  };

  return (
    <div className="relative flex flex-col lg:flex-row h-screen bg-gray-50">
      <div className="hidden lg:flex flex-col items-center justify-center lg:w-1/2 w-full bg-orange-100">
        <img src="path_to_your_image" alt="GetExpert" className="w-1/2 mb-8" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-md w-11/12 lg:w-[28rem]">
          <h2 className="text-2xl font-semibold mb-4">Register here</h2>
          <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <InputField type="email" placeholder="email address" />
            </div>
            <div className="mb-4 flex space-x-2">
              <InputField
                type="text"
                placeholder="username"
                className="w-1/2"
              />
              <InputField
                type="text"
                placeholder="mobile number"
                className="w-1/2"
              />
            </div>
            <div className="mb-4">
              <InputField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <InputField
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {passwordError && (
              <div className="mb-4 text-red-500 text-sm">{passwordError}</div>
            )}
            <div className="flex justify-between items-center mb-4">
              <Button text="Register" className="w-full" />
            </div>
            <div className="text-center mb-4">
              <a href="#" className="text-sm text-orange-500">
                Forgot Password?
              </a>
            </div>
            <div className="text-center mb-4">
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={handleSignInClick}
                  className="text-orange-500"
                >
                  Sign in
                </button>
              </p>
            </div>
            {loading && <Spinner />}
          </form>
          <div className="flex items-center justify-center my-4">
            <span className="border-t border-gray-300 flex-grow"></span>
            <span className="mx-4 text-gray-500">OR</span>
            <span className="border-t border-gray-300 flex-grow"></span>
          </div>
          <div className="flex justify-center">
            <Button
              text="Sign up with Google"
              className="bg-orange-100 text-orange-500"
              onClick={handleGoogleSignInClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
