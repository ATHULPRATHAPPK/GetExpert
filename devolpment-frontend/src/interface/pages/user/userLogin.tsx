import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import {loginUser} from "../../../application/service/user/authService";
import {setUser } from "../../../state/user/userSlice";
import Spinner from "../../components/Spinner";
import "../../styles/index.css";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false); 
  const [loading, setLoading] = useState(false);

  const handleSignInClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log("Sign in clicked");
    console.log(email);
    handleLogin();
  };


  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      console.log("response", response.userDetails);
      const userDetails = {
        email: response.userDetails.email,
        name: response.userDetails.userName,
        userName: response.userDetails.userName,
        address: response.userDetails.address,
        gender: response.userDetails.gender,
        profilePhotoUrl: response.userDetails.profilePhotoUrl,
      };
      setLoading(false);
      if (response.success)  {
        dispatch(setUser(userDetails));
        navigate("/");
      } else {
        setErrorMessage("Invalid email or password.");
        setHasError(true); 
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setErrorMessage("Invalid email or password.");
      setHasError(true);
    }
  };

  const handleGoogleSignInClick = () => {
    console.log("Google Sign in clicked");
  };

  const handleSignUpClick = () => {
    navigate("/register");
  };

  return (
    <div className="relative flex flex-col lg:flex-row h-screen bg-gray-50">
      <div className="hidden lg:flex flex-col items-center justify-center lg:w-1/2 w-full bg-orange-400">
        <img src="path_to_your_image" alt="GetExpert" className="w-1/2 mb-8" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-md w-11/12 lg:w-[28rem]">
          <h2 className="text-2xl font-semibold mb-4">Welcome to GetExpert</h2>
          <h1 className="text-3xl font-bold mb-6">Sign in</h1>
          {errorMessage && (
            <p className="text-center text-sm text-red-500 mb-4">
              {errorMessage}
            </p> // Display the error message
          )}
          {!hasError && location.state?.message && (
            <p className="text-center text-sm text-green-500 mb-4">
              {location.state.message}
            </p> // Display the location.state message if no error
          )}
          <form onSubmit={handleSignInClick}>
            <div className="mb-4">
              <InputField
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <div className="flex justify-between items-center mb-4">
              <Button text="Sign in" className="w-full" />
            </div>
            <div className="text-center mb-4">
              <a href="#" className="text-sm text-orange-500">
                Forgot Password?
              </a>
            </div>
            <div className="text-center mb-4">
              <p>
                No Account?{" "}
                <button
                  type="button"
                  onClick={handleSignUpClick}
                  className="text-orange-500"
                >
                  Sign up
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
              text="Sign in with Google"
              className="bg-orange-100 text-orange-500"
              onClick={handleGoogleSignInClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
