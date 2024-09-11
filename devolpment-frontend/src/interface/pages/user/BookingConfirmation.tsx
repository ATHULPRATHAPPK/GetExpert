
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';

import { FaMapMarkerAlt, FaClipboardList, FaCalendarAlt, FaFileAlt, FaMoneyBillWave } from 'react-icons/fa';
import { paymentCompleted } from '../../../application/service/user/userService';
const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { technician, bookingData } = location.state || {};

  if (!technician || !bookingData) {
    return <p>No booking details available.</p>;
  }



const bookingCompleted = async () => {
  try {
    const result = await paymentCompleted(technician, bookingData);
    
    if (result.status === true) {
      // Pass the booking data to the success page
      navigate('/booking-completed', { 
        replace: true, 
        state: { bookingDetails: result.savedBooking, technicianDetails: technician }
      });
      location.state = null; 
    }
  } catch (error) {
    console.error("Error in bookingCompleted:", error);
  }
};


  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto p-4 mt-20">
        <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col md:flex-row gap-6">
          {/* Service Details */}
          <div className="md:w-2/3 bg-gray-50 p-4 rounded-lg shadow-lg space-y-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <FaClipboardList className="mr-2 text-orange-500" />
              Service Details
            </h2>

            <div className="flex items-center">
              <img
                src={technician.profilePhotoUrl}
                alt={technician.userName}
                className="w-16 h-16 rounded-full border-4 border-orange-500 mr-4"
              />
              <div>
                <h3 className="text-md font-bold text-gray-900">{technician.userName}</h3>
                <p className="text-sm text-gray-600">{technician.profession}</p>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white p-4 rounded-lg shadow-inner">
              <h3 className="font-semibold text-md text-gray-900 mb-2 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-orange-500" />
                Location Address:
              </h3>
              <p className="text-gray-700 text-sm">
                {bookingData.address?.buildingNumber}, {bookingData.address?.city}, {bookingData.address?.state} - {bookingData.address?.pincode}
              </p>
            </div>

            {/* Subcategories */}
            <div className="bg-white p-4 rounded-lg shadow-inner">
              <h3 className="font-semibold text-md text-gray-900 mb-2 flex items-center">
                <FaClipboardList className="mr-2 text-orange-500" />
                Work Subcategories:
              </h3>
              <ul className="list-disc pl-6 text-gray-700 text-sm">
                {technician.subcategories?.map((subcategory: string, index: number) => (
                  <li key={index}>{subcategory}</li>
                ))}
              </ul>
            </div>

            {/* Schedule Info */}
            <div className="bg-white p-4 rounded-lg shadow-inner">
              <h3 className="font-semibold text-md text-gray-900 mb-2 flex items-center">
                <FaCalendarAlt className="mr-2 text-orange-500" />
                Schedule:
              </h3>
              <p className="text-gray-700 text-sm">The technician will arrive on:</p>
              <p className="font-semibold text-red-600">{bookingData.time} on {bookingData.date}</p>
            </div>

            {/* Additional Notes */}
            <div className="bg-white p-4 rounded-lg shadow-inner">
              <h4 className="font-bold text-gray-900 text-md mb-2 flex items-center">
                <FaFileAlt className="mr-2 text-orange-500" />
                Additional Notes:
              </h4>
              <p className="text-gray-700 text-sm">
                The booking charge is a non-refundable fee to secure your appointment.
              </p>
            </div>
          </div>

          {/* Payment Summary - Sticky Sidebar */}
          <div className="md:w-1/3 bg-gray-50 p-4 rounded-lg shadow-lg md:sticky md:top-4 space-y-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <FaMoneyBillWave className="mr-2 text-orange-500" />
              Payment Summary
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <p className="text-gray-600">Booking Charge</p>
                <p className="font-bold text-gray-900">125.00 rs</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-gray-600">GST (18%)</p>
                <p className="font-bold text-gray-900">25.00 rs</p>
              </div>
              <hr className="my-4 border-gray-300" />
              <div className="flex justify-between text-lg">
                <p className="font-bold text-gray-900">Amount to Pay</p>
                <p className="font-bold text-gray-900">150.00 rs</p>
              </div>
              <button
                onClick={bookingCompleted}
                className="mt-4 w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-2 rounded-full shadow-lg hover:from-orange-500 hover:to-orange-600 transition duration-300"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
