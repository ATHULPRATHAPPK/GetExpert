import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import "../../styles/index.css";

import { loginTech } from "../../../application/service/technician/authService";
const TechnicianLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);


  const handleSignInClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Technician sign in clicked");
    handleLogin();
  };

  const handleLogin = async () => {
    try {
      const response = await loginTech(email, password);
     
      if (response.success) {
        navigate("/technician/dash-board");
      } else {
        setErrorMessage("Invalid email or password.");
      }
     
    } catch (error) {
      console.log(error);
      setErrorMessage("An unexpected error occurred. Please try again.");
      setHasError(true);
    }
  };

  const handleGoogleSignInClick = () => {
    console.log("Google Sign in clicked");
  };

  const handleSignUpClick = () => {
    navigate("/technician/register"); 
  };

  return (
    <div className="relative flex flex-col lg:flex-row h-screen bg-gray-50">
      <div className="hidden lg:flex flex-col items-center justify-center lg:w-1/2 w-full bg-blue-100">
     
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-md w-11/12 lg:w-[28rem]">
          <h2 className="text-2xl font-semibold mb-4">Welcome to GetExpert</h2>
          <h1 className="text-3xl font-bold mb-6">Technician Sign In</h1>
          {errorMessage && (
            <p className="text-center text-sm text-red-500 mb-4">
              {errorMessage}
            </p>
          )}
          {!hasError && location.state?.message && (
            <p className="text-center text-sm text-green-500 mb-4">
              {location.state.message}
            </p>
          )}
          <form onSubmit={handleSignInClick}>
            <div className="mb-4">
              <InputField
                type="email"
                placeholder="Technician Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <InputField
                type="password"
                placeholder="Technician Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center mb-4">
              <Button text="Sign In" className="w-full bg-blue-400 hover:bg-orange-400" />
            </div>
            <div className="text-center mb-4">
              <a href="#" className="text-sm text-blue-500">
                Forgot Password?
              </a>
            </div>
            <div className="text-center mb-4">
              <p>
                No Account?{" "}
                <button
                  type="button"
                  onClick={handleSignUpClick}
                  className="text-blue-500"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
          <div className="flex items-center justify-center my-4">
            <span className="border-t border-gray-300 flex-grow"></span>
            <span className="mx-4 text-gray-500">OR</span>
            <span className="border-t border-gray-300 flex-grow"></span>
          </div>
          <div className="flex justify-center">
            <Button
              text="Sign in with Google"
              className=" text-blue-500  hover:bg-orange-400"
              onClick={handleGoogleSignInClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianLoginPage;
