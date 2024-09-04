import React from 'react';
import Sidebar from '../Sidebar';
import { FaUsers, FaCogs, FaCalendarAlt } from 'react-icons/fa';

const adminMenuItems = [
  { path: '/admin/dash-board', label: 'Dashboard', icon: <FaCogs /> },
  { path: '/admin/users', label: 'Users', icon: <FaUsers /> },
  { path: '/admin/technicians', label: 'Technicians', icon: <FaUsers /> },
  { path: '/admin/booking-management', label: 'Booking Management', icon: <FaCalendarAlt /> },
];

const BookingManagement: React.FC = () => {
  const bookings = [
    { id: 1, customer: 'John Doe', service: 'Plumbing', status: 'Pending' },
    { id: 2, customer: 'Jane Smith', service: 'Electrical', status: 'Completed' },
    { id: 3, customer: 'Alice Johnson', service: 'Carpentry', status: 'In Progress' },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar title="Admin" menuItems={adminMenuItems} className="bg-gray-800 text-white" classElements='' />
      
      <div className="bg-white rounded-lg shadow-md p-6 flex-grow">
        <h2 className="text-xl font-bold mb-4">Booking Management</h2>
        <ul>
          {bookings.map(booking => (
            <li key={booking.id} className="border-b border-gray-200 py-2">
              <div className="font-medium">{booking.customer}</div>
              <div className="text-gray-500">{booking.service}</div>
              <div className={`text-gray-700 ${booking.status === 'Completed' ? 'text-green-500' : booking.status === 'In Progress' ? 'text-yellow-500' : 'text-red-500'}`}>
                {booking.status}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookingManagement;
