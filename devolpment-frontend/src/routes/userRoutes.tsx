import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from '../interface/pages/user/Home';
import LoginPage from '../interface/pages/user/userLogin';
import RegisterPage from '../interface/pages/user/register';
import OtpVerificationPage from '../interface/pages/user/OtpVerify';
import Profile from '../interface/pages/user/profile';
import BookingPage from "../interface/pages/user/BookingPage";
import AvailableTechnicians from "../interface/pages/user/AvailableTechnicians";
import BookingConfirmation from "../interface/pages/user/BookingConfirmation";
import BookingSuccess from "../interface/pages/user/BookingSuccess";
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
      <Route path="/booking" element={<BookingPage/>} />
      <Route path="/available-technicians" element={<AvailableTechnicians/>} />
      <Route path="/booking-confirm" element={<BookingConfirmation/>} />
      <Route path="/booking-completed" element={<BookingSuccess/>} />
      </Route>

    </Routes>
  );
};

export default UserRoutes;
