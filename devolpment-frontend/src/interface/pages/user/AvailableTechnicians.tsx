import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import Navbar from '../../components/Navbar';


const AvailableTechnicians = () => {
  const location = useLocation();
  const { technicians = [], bookingData = {} } = location.state || {}; // Default to empty values
  
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBooking = (technician: any) => {
    // Update the technician field in the Redux store
    

    // Navigate to the booking confirmation page with both technician and booking data
    navigate('/booking-confirm', { state: { technician, bookingData } });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-24">
      <Navbar />
      <div className="max-w-6xl mx-auto bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-10">Available Technicians</h1>
        
        {technicians.length > 0 ? (
          technicians.map((technician: any) => (
            <div
              key={technician._id} // Use _id as the key
              className="flex items-center bg-white p-8 rounded-lg shadow-md mb-8 border-t-4 border-orange-500 hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              {/* Technician Profile Image */}
              <img
                src={technician.profilePhotoUrl}
                alt={technician.userName}
                className="w-32 h-32 rounded-full border-4 border-orange-500 mr-8"
              />
              
              {/* Technician Details */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{technician.profession}</h2>
                <p className="text-gray-600 mb-1"><strong>Name:</strong> {technician.userName}</p>
                <p className="text-gray-600 mb-1"><strong>Email:</strong> {technician.email}</p>
                <p className="text-gray-600 mb-1"><strong>Location:</strong> {technician.preferredWorkPlace.district}</p>
                
                {/* Ratings */}
                <div className="flex items-center">
                  <FaStar className="text-orange-500 mr-1" />
                  <span>{technician.rating || 'N/A'}</span> {/* Provide fallback if rating is not available */}
                </div>

                {/* Book Now Button */}
                <button
                  className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600"
                  onClick={() => handleBooking(technician)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No technicians available</div>
        )}
      </div>
    </div>
  );
};

export default AvailableTechnicians;
