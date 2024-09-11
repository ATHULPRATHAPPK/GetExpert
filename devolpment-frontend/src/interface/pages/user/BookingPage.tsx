import { useEffect, useState } from 'react';
import { useLocation ,useNavigate} from "react-router-dom";
import Navbar from '../../components/Navbar';
import { useSelector } from "react-redux";
import { FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa'; // Import FaCheckCircle for the tick icon
import { serviceRequired, serviceSelection } from "../../../application/service/user/userService";
import { RootState } from "../../../state/store";


interface Address {
  _id: string;
  buildingNumber: string;
  city: string;
  pincode: string;
  state: string;
}

const BookingPage = () => {

  const userEmail = useSelector((state: RootState) => state.user.email);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const service: string | null = queryParams.get('service');
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [services, setServices] = useState<string[]>([]); // Store the dynamic services
  const [addresses, setAddresses] = useState<Address[]>([]); // Store fetched addresses
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null); // Selected address
  const [showAddressOptions, setShowAddressOptions] = useState(false); // Toggle address change option
  const [isConfirmed, setIsConfirmed] = useState(false); // Track if the address is confirmed
  const [error, setError] = useState<string | null>(null); // Error state


  
  useEffect(() => {
    if (service) {
      serviceRequired(service, userEmail)
        .then((response) => {
          if (response.data.status) {
            const { category, address } = response.data.result;
            console.log("Fetched address array:", address); // Correctly log the address array
  
            setServices(category); // Set service categories
            setAddresses(address); // Set fetched addresses
            if (address.length > 0) {
              setSelectedAddress(address[0]); // Set the first address as the default
            }
          } else {
            setError("Service not available");
          }
        })
        .catch((error) => {
          setError("Error fetching service details. Please try again later.");
          console.error("Error fetching service details", error);
        });
    } else {
      setError("Service not specified.");
    }
  }, [service]);
  
  const timeSlots = [
    "9:00 am", "10:00 am", "11:00 am", "12:00 pm", "1:00 pm", "2:00 pm",
    "3:00 pm", "4:00 pm", "5:00 pm", "6:00 pm", "7:00 pm", "8:00 pm"
  ];

  const selectService = (service: string) => setSelectedService(service);
  const selectDate = (date: string) => setSelectedDate(date);
  const selectTime = (time: string) => setSelectedTime(time);

  // Handle address selection
  const handleAddressChange = (address: Address) => {
    setSelectedAddress(address);
    setShowAddressOptions(false); // Hide the address options after selecting one
    setIsConfirmed(false); // Reset confirmation when changing address
  };

  // Handle address confirmation
  const handleConfirm = () => {
    setIsConfirmed(true); // Mark the address as confirmed
    setShowAddressOptions(false); // Hide address options when confirmed
  };

  const bookingData = {
    category: selectedService,
    service: service,
    date: selectedDate,
    time: selectedTime,
    address: selectedAddress,
    userEmail: userEmail
  };

 
  const submitBooking = () => {
    if (selectedService && selectedDate && selectedTime && selectedAddress && isConfirmed) {
      serviceSelection(bookingData)
        .then(response => {
          const resultArray = response.result; 
          console.log("resultArray", resultArray);
          navigate('/available-technicians', { state: { technicians: resultArray, bookingData } });
        })
        .catch(error => {
          navigate('/available-technicians');
          console.error("Error submitting booking:", error);
        });
    } else {
      console.error("Incomplete booking details.");
    }
  };
  

  return (
    <div className="bg-gray-50 min-h-screen p-20">
      <Navbar />
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Display Error if Service is not available */}
        {error ? (
          <div className="text-red-500 font-semibold mb-6">
            {error}
          </div>
        ) : (
          <>
            {/* Service Selection */}
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Select Service</h2>
            <div className="grid grid-cols-2 gap-6">
              {services.map((service, index) => (
                <button
                  key={index}
                  className={`p-4 text-left rounded-lg shadow-md transition-transform transform hover:scale-105 ${selectedService === service ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}
                  onClick={() => selectService(service)}
                >
                  {service}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Service Location */}
        <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-800">Service Location</h2>
        {selectedAddress && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex justify-between items-center transition-transform transform hover:scale-105">
            <div>
              <h3 className="font-semibold text-lg text-gray-700 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-orange-500" />
                {selectedAddress.buildingNumber} {selectedAddress.city}
              </h3>
              <p className="text-gray-600">Pincode: {selectedAddress.pincode}</p>
              <p className="text-gray-600">{selectedAddress.state}</p>
            </div>
            <div className="flex items-center">
              {isConfirmed && (
                <FaCheckCircle className="text-orange-500 mr-4 scale-150" />
              )}
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-lg mr-4 shadow-md hover:bg-orange-600"
                onClick={handleConfirm}
              >
                Confirm
              </button>
              <button
                className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300"
                onClick={() => setShowAddressOptions(!showAddressOptions)}
              >
                Change
              </button>
            </div>
          </div>
        )}

        {/* Show address options when user clicks "Change" */}
        {showAddressOptions && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Select Another Address</h3>
            <div className="grid grid-cols-2 gap-4">
              {addresses.map((address) => (
                <div
                  key={address._id}
                  className={`p-4 bg-white border border-gray-300 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 ${selectedAddress?._id === address._id ? 'bg-orange-500 text-white' : 'bg-white'}`}
                  onClick={() => handleAddressChange(address)}
                >
                  <h4>{address.buildingNumber}, {address.city}</h4>
                  <p>{address.pincode}, {address.state}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Date and Time Selection */}
        <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-800">Select Date and Time</h2>
        <div className="flex space-x-10">
          {/* Date Picker */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <h3 className="font-semibold mb-4 text-gray-700">Select Date</h3>
            <input
              type="date"
              onChange={(e) => selectDate(e.target.value)}
              className="p-3 bg-white border rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={{ colorScheme: 'orange' }}
            />
          </div>

          {/* Time Slot Picker */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 w-full">
            <h3 className="font-semibold mb-4 text-gray-700">Select Time Slot</h3>
            <div className="grid grid-cols-3 gap-4">
              {timeSlots.map((timeSlot, index) => (
                <button
                  key={index}
                  className={`p-2 rounded-md shadow-md transition-colors ${selectedTime === timeSlot ? 'bg-orange-500 text-white' : 'bg-white'}`}
                  onClick={() => selectTime(timeSlot)}
                >
                  {timeSlot}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-12 text-right">
          <button
            className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 transition-transform transform hover:scale-105"
            onClick={submitBooking}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
