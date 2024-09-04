import React from "react";
import { Routes, Route } from 'react-router-dom';
import AdminLoginPage from '../interface/pages/admin/Login';
import AdminDashboard from "../interface/pages/admin/DashBoard";
import UserData from "../interface/components/admin/UserData";
import TechnicianData from "../interface/components/admin/TechnicianData";
import BookingManagement from "../interface/components/admin/BookingManagement";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLoginPage />} />
      <Route path="/dash-board" element={<AdminDashboard />} />
      <Route path="/users" element={<UserData />} />
      <Route path="/technicians" element={<TechnicianData />} />
      <Route path="/booking-management" element={<BookingManagement />} />
    </Routes>
  );
};

export default AdminRoutes;
