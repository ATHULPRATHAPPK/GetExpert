import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import "../../styles/index.css";
import { loginAdmin } from "../../../application/service/admin/authService";
import { setAdmin } from "../../../state/admin/adminSlice";

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignInClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Admin sign in clicked");
    handleLogin();
  };

  const handleLogin = async () => {
    try {
      const response = await loginAdmin(email, password);
      const adminDetails = {
        email: response.data.email,
      };
      
      if (response.success) {
        dispatch(setAdmin(adminDetails));  // Store the admin email in the Redux store
        navigate("/admin/dash-board");
      } else {
        setErrorMessage("Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="relative flex flex-col lg:flex-row h-screen bg-gray-100">
      <div className="hidden lg:flex flex-col justify-center lg:w-1/2 w-full bg-gray-900 text-white p-8">
        <div className="text-left">
          <h2 className="text-3xl font-bold mb-2">Admin Dashboard</h2>
          <p className="text-lg">Manage your application effectively.</p>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 lg:w-[30rem]">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Sign In</h1>
          {errorMessage && (
            <p className="text-center text-sm text-red-500 mb-4">
              {errorMessage}
            </p>
          )}
          <form onSubmit={handleSignInClick}>
            <div className="mb-4">
              <InputField
                type="email"
                placeholder="Admin Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-400"
              />
            </div>
            <div className="mb-4">
              <InputField
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-400"
              />
            </div>
            <div className="flex justify-between items-center mb-4">
              <Button text="Sign In" className="w-full text-white bg-gray-700 hover:bg-gray-500" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
