import React from "react";
import { Routes, Route } from 'react-router-dom';
import AdminLoginPage from '../interface/pages/admin/Login';
import AdminDashboard from "../interface/pages/admin/DashBoard";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLoginPage />} />
      <Route path="/dash-board" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AdminRoutes;
