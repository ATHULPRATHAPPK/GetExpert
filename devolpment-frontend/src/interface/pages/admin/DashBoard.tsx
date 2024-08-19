import React from 'react';
import Sidebar from '../../components/Sidebar';
import "../../styles/index.css";

const adminMenuItems = [
  { path: '/admin/dashboard', label: 'Dashboard' },
  { path: '/admin/users', label: 'Users' },
  { path: '/admin/technicians', label: 'Technicians' },
  { path: '/admin/booking-management', label: 'Booking Management' },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar title="Admin" menuItems={adminMenuItems} />
      <div className="flex-1 p-8 bg-gray-100">
        {/* <Stats activeBookings={230} pendingBookings={530} completedBookings={1230} /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
