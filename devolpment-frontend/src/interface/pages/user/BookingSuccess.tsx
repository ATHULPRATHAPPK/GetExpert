// In BookingSuccess.js
import { useLocation } from 'react-router';
import { FaCheckCircle, FaHome, FaTicketAlt } from 'react-icons/fa';
import Navbar from '../../components/Navbar';

const BookingSuccess: React.FC = () => {
  const location = useLocation();
  const { bookingDetails, technicianDetails } = location.state || {};

  if (!bookingDetails || !technicianDetails) {
    return <p>Booking details not available.</p>;
  }

  return (
    <div className="bg-gradient-to-b from-orange-100 to-gray-100 min-h-screen flex flex-col items-center pt-24">
      <Navbar />
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-2xl p-8">
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="text-green-500 text-6xl" />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Booking Confirmed!</h2>
        <p className="text-center text-gray-600 mb-6">Thank you for choosing our service. Your booking has been successfully confirmed. Please review the details below.</p>

        <div className="bg-gray-50 p-6 rounded-xl shadow-md">
          <h3 className="text-center text-xl font-semibold text-gray-700 mb-4">Ticket Information <FaTicketAlt className="inline-block text-orange-500" /></h3>

          <div className="text-gray-700">
            <p className="text-center text-lg font-bold mb-4">Ticket Number: <span className="text-orange-500">{bookingDetails._id}</span></p>

            <div className="border-t border-gray-300 my-4"></div>

            <div className="mb-4">
              <p><strong>Technician Name:</strong> {technicianDetails.userName}</p>
              <p><strong>Technician ID:</strong> {technicianDetails._id}</p>
              <p><strong>Service:</strong> {bookingDetails.service}</p>
              <p><strong>Booking Date:</strong> <span className="text-red-500">{bookingDetails.time}</span> on <span className="text-red-500">{bookingDetails.date}</span></p>
            </div>

            <div className="border-t border-gray-300 my-4"></div>

            <div>
              <p><strong>OTP for Technician Verification:</strong></p>
              <p className="text-xl font-bold text-center text-red-500 mb-2">748392</p>
              <p className="text-xs text-gray-500">
                Please provide this OTP to the technician upon their arrival to verify the booking.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8 space-x-4">
          <button className="flex items-center justify-center w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200">
            <FaTicketAlt className="mr-2" /> View Bookings
          </button>
          <button className="flex items-center justify-center w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200">
            <FaHome className="mr-2" /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
