import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { FaUsers, FaCogs, FaCalendarAlt } from 'react-icons/fa';
import { fetchTechData } from '../../../application/service/admin/adminService';
import TechnicianDetails from '../ViewDetails';

const adminMenuItems = [
  { path: '/admin/dash-board', label: 'Dashboard', icon: <FaCogs /> },
  { path: '/admin/users', label: 'Users', icon: <FaUsers /> },
  { path: '/admin/technicians', label: 'Technicians', icon: <FaUsers /> },
  { path: '/admin/booking-management', label: 'Booking Management', icon: <FaCalendarAlt /> },
];

const TechnicianData: React.FC = () => {
  const [technicians, setTechnicians] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPending, setShowPending] = useState(false); // New state for showing pending approvals
  const [selectedTechnician, setSelectedTechnician] = useState<any | null>(null);
  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const techData = await fetchTechData();
        setTechnicians(techData);
        console.log("technicians",technicians);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch technicians.');
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  const handleBlock = (techId: string) => {
    console.log(`Blocking technician with ID: ${techId}`);
    // Implement block logic here
  };

  const handleView = (techEmail: string) => {
    console.log(techEmail,"techemail");
    
    const technician = technicians.find(tech => tech.email === techEmail);
    setSelectedTechnician(technician);
  };

  const handleCloseDetails = () => {
    setSelectedTechnician(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Filter technicians based on the showPending state
  const displayedTechnicians = showPending
    ? technicians.filter((technician) => !technician.verified)
    : technicians;

  return (
    <div className="flex h-screen">
      <Sidebar title="Admin" menuItems={adminMenuItems} className="bg-gray-800 text-white" classElements='' />

      <div className="bg-white rounded-lg shadow-md p-6 flex-grow">
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 rounded-l-full ${!showPending ? 'bg-gray-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={() => setShowPending(false)}
          >
            All Technicians
          </button>
          <button
            className={`px-4 py-2 rounded-r-full ${showPending ? 'bg-gray-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={() => setShowPending(true)}
          >
            Pending Approvals
          </button>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="text-gray-600 uppercase text-sm leading-normal bg-gray-100">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Tech ID</th>
              <th className="py-3 px-6 text-left">Specialization</th>
              <th className="py-3 px-6 text-left">Rating</th>
              <th className="py-3 px-6 text-left">Contact No</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Action</th>
              <th className="py-3 px-6 text-center">Profile</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {displayedTechnicians.map((technician) => (
              <tr key={technician._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <span className="font-medium">{technician.userName}</span>
                </td>
                <td className="py-3 px-6 text-left">{technician._id}</td>
                <td className="py-3 px-6 text-left">{technician.professionInfo?.profession || "N/A"}</td>
                <td className="py-3 px-6 text-left">{technician.rating || "N/A"}</td>
                <td className="py-3 px-6 text-left">{technician.contactNo || "N/A"}</td>
                <td className="py-3 px-6 text-left">
                  <span className={`py-1 px-3 rounded-full text-xs ${technician.status === 'Active' ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'}`}>
                    {technician.status || 'Inactive'}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleBlock(technician._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Block
                  </button>
                </td>
                <td className="py-3 px-6 text-center">
                <button
                    onClick={() => handleView(technician.email)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedTechnician && (
        <TechnicianDetails 
          technician={selectedTechnician} 
          onClose={handleCloseDetails} 
        />
      )}
    </div>
  );
};

export default TechnicianData;
