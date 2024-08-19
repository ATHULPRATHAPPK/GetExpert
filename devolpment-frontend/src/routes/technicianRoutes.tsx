import React from "react";
import { Routes, Route } from 'react-router-dom';
import TechnicianLoginPage from "../interface/pages/technician/login";

const TechRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<TechnicianLoginPage />} />
    </Routes>
  );
};

export default TechRoutes;
