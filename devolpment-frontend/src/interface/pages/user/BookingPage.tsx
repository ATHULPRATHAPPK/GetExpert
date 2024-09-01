import  { useState } from 'react';

import Navbar from '../../components/Navbar';
import { FaMapMarkerAlt } from 'react-icons/fa';

const BookingPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const services = [
    "Electrical Installation",
    "Electrical Repairs",
    "Electrical Upgrades",
    "Lighting Solutions",
    "Safety Inspections",
    "Other service",
  ];

  const timeSlots = [
    "9:00 am", "10:00 am", "11:00 am", "12:00 pm", "1:00 pm", "2:00 pm",
    "3:00 pm", "4:00 pm", "5:00 pm", "6:00 pm", "7:00 pm", "8:00 pm"
  ];

  const selectService = (service:any) => setSelectedService(service);
  const selectDate = (date:any) => setSelectedDate(date);
  const selectTime = (time:any) => setSelectedTime(time);

  return (
    <div className="bg-gray-50 min-h-screen p-20">
        <Navbar/>
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8 ">
        
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

        {/* Service Location */}
        <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-800">Service Location</h2>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex justify-between items-center transition-transform transform hover:scale-105">
          <div>
            <h3 className="font-semibold text-lg text-gray-700 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-orange-500" />
              Athul pk
            </h3>
            <p className="text-gray-600">Vrindhavanam(h)</p>
            <p className="text-gray-600">Panthalayani, Koyilandy(po)</p>
            <p className="text-gray-600">Pincode: 673305</p>
            <p className="text-gray-600">Kozhikode, Kerala</p>
          </div>
          <div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg mr-4 shadow-md hover:bg-orange-600">Confirm</button>
            <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300">Change</button>
          </div>
        </div>

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
            <div className="grid grid-cols-4 gap-4">
              {timeSlots.map((time, index) => (
                <button
                  key={index}
                  className={`p-3 rounded-lg shadow-md transition-all transform hover:scale-105 ${selectedTime === time ? 'bg-orange-500 text-white' : 'bg-white border border-gray-300'}`}
                  onClick={() => selectTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-end mt-12">
          <button
            className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 transition-all transform hover:scale-105"
            disabled={!selectedService || !selectedDate || !selectedTime}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
