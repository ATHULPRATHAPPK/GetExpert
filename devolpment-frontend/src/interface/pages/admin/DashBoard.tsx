import React from 'react';

import { FaUsers, FaCogs, FaCalendarAlt } from 'react-icons/fa';
import Sidebar from '../../components/Sidebar';


const adminMenuItems = [
  { path: '/admin/dash-board', label: 'Dashboard', icon: <FaCogs /> },
  { path: '/admin/users', label: 'Users', icon: <FaUsers /> },
  { path: '/admin/technicians', label: 'Technicians', icon: <FaUsers /> },
  { path: '/admin/booking-management', label: 'Booking Management', icon: <FaCalendarAlt /> },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar title="Admin" menuItems={adminMenuItems} className="bg-gray-800 text-white" classElements='' />
      <div className="flex-1 p-8 bg-gray-100 overflow-auto">
       
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 flex justify-center items-center">
                <img src="https://via.placeholder.com/300" alt="Placeholder" className="rounded-lg" />
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 flex justify-center items-center">
                <img src="https://via.placeholder.com/300" alt="Placeholder" className="rounded-lg" />
              </div>
            </div>      
      </div>
    </div>
  );
};

export default AdminDashboard;
