import React from 'react';
import Sidebar from '../Sidebar';

import { FaUsers, FaCogs, FaCalendarAlt } from 'react-icons/fa';
const adminMenuItems = [
  { path: '/admin/dash-board', label: 'Dashboard', icon: <FaCogs /> },
  { path: '/admin/users', label: 'Users', icon: <FaUsers /> },
  { path: '/admin/technicians', label: 'Technicians', icon: <FaUsers /> },
  { path: '/admin/booking-management', label: 'Booking Management', icon: <FaCalendarAlt /> },
];
const UserData: React.FC = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar title="Admin" menuItems={adminMenuItems} className="bg-gray-800 text-white" classElements='' />    
       
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">User Data</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} className="border-b border-gray-200 py-2">
            <div className="font-medium">{user.name}</div>
            <div className="text-gray-500">{user.email}</div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default UserData;
