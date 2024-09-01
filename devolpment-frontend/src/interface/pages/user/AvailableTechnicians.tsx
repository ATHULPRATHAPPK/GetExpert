import { FaStar } from 'react-icons/fa';
import Navbar from '../../components/Navbar';

const technicians = [
  {
    name: "Xavior M",
    role: "Electrician",
    experience: "10+ years",
    certifications: "Licensed Electrician, OSHA Certified",
    specialties: "Residential wiring, electrical repairs, lighting installations",
    reviews: 5,
    imageUrl: "https://via.placeholder.com/100", // replace with actual image URL
  },
  {
    name: "John D",
    role: "Plumber",
    experience: "8+ years",
    certifications: "Licensed Plumber, OSHA Certified",
    specialties: "Residential plumbing, pipe repairs, drain cleaning",
    reviews: 4,
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    name: "Alice W",
    role: "Carpenter",
    experience: "12+ years",
    certifications: "Licensed Carpenter, OSHA Certified",
    specialties: "Furniture making, wood repairs, custom cabinetry",
    reviews: 5,
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    name: "Michael B",
    role: "Painter",
    experience: "7+ years",
    certifications: "Licensed Painter, OSHA Certified",
    specialties: "Interior painting, exterior painting, custom finishes",
    reviews: 3,
    imageUrl: "https://via.placeholder.com/100",
  },
  // Add more technician objects as needed
];

const AvailableTechnicians = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-24">
      <Navbar />
      <div className="max-w-6xl mx-auto bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-10">Available Technicians</h1>
        
        {technicians.map((technician, index) => (
          <div
            key={index}
            className="flex items-center bg-white p-8 rounded-lg shadow-md mb-8 border-t-4 border-orange-500 hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <img
              src={technician.imageUrl}
              alt={technician.name}
              className="w-32 h-32 rounded-full border-4 border-orange-500 mr-8"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{technician.role}</h2>
              <p className="text-gray-600 mb-1"><strong>Experience:</strong> {technician.experience}</p>
              <p className="text-gray-600 mb-1"><strong>Certifications:</strong> {technician.certifications}</p>
              <p className="text-gray-600 mb-1"><strong>Specialties:</strong> {technician.specialties}</p>
              <div className="flex items-center mt-4">
                <span className="text-gray-600 mr-2">Customer Reviews:</span>
                <div className="text-yellow-400 flex">
                  {[...Array(technician.reviews)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </div>
            <button className="ml-8 bg-orange-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-300 ease-in-out">
              Book service
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableTechnicians;
