import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TechRoutes from './routes/technicianRoutes';
import AdminRoutes from './routes/adminRoutes';
import UserRoutes from './routes/userRoutes';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/*" element={<UserRoutes />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Technician Routes */}
        <Route path="/technician/*" element={<TechRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
