import React from 'react';
import Sidebar from '../../components/Sidebar';
import "../../styles/index.css";

const adminMenuItems = [
  { path: '#', label: 'Home' },
  { path: '#', label: 'Profile Management' },
  { path: '#', label: 'Booking Management' },
  { path: '#', label: 'Payment History' },
];

const TechDashboard: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar title="Technician" menuItems={adminMenuItems} />
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

export default TechDashboard;
