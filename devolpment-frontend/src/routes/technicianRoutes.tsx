import React from "react";
import { Routes, Route } from 'react-router-dom';
import TechnicianLoginPage from "../interface/pages/technician/login";
import RegisterPage from "../interface/pages/technician/register";
import OtpVerificationPage from "../interface/pages/technician/otpPage";
import TechDashboard from "../interface/pages/technician/dashBoard";
const TechRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<TechnicianLoginPage />} />
      <Route path ="/register" element={<RegisterPage/>}/>
      <Route path="/otp-verification" element={<OtpVerificationPage />} />
      <Route path="/dash-board" element={<TechDashboard />} />
    </Routes>
  );
};

export default TechRoutes;
