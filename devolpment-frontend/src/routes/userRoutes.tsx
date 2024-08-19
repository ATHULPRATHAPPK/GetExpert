import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from '../interface/pages/user/Home';
import LoginPage from '../interface/pages/user/userLogin';
import RegisterPage from '../interface/pages/user/register';
import OtpVerificationPage from '../interface/pages/user/OtpVerify';
import Profile from '../interface/pages/user/profile';
import { ProtectedRouter } from '../interface/components/protectedRouter';

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/otp-verification" element={<OtpVerificationPage />} />
      <Route element={<ProtectedRouter />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
