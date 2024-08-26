import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaShieldAlt, FaWallet, FaListAlt } from 'react-icons/fa';
import { profileUpdate } from '../../../application/service/user/userService';
import Button from "../../components/Button";
import Navbar from '../../components/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';

export interface Address {
  buildingNumber: string;
  city: string;
  pincode: string;
  state: string;
}

export interface FormData {
  email: string | null;
  phone: string;
  gender: string;
  profilePhotoUrl: string;
  address: Address[];
}

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'security' | 'wallet'>('bookings');
  const [showAddDetails, setShowAddDetails] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<FormData>({
    email: user.email,
    phone: '',
    gender: '',
    profilePhotoUrl: '',
    address: [{ buildingNumber: '', city: '', pincode: '', state: '' }]
  });

  const profilePhoto = "https://via.placeholder.com/150";
  const name = "Jane Doe";
  const jobTitle = "User";
  const location = "San Francisco, USA";
  const contactEmail = "jane.doe@example.com";
  const contactPhone = "+1 234 567 8901";
  const walletBalance = "$300.00";


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedAddress = formData.address.map((addr, i) => (
      i === index ? { ...addr, [name]: value } : addr
    ));

    setFormData((prev) => ({
      ...prev,
      address: updatedAddress
    }));
  };

  const handleAddAddress = () => {
    setFormData((prev) => ({
      ...prev,
      address: [...prev.address, { buildingNumber: '', city: '', pincode: '', state: '' }]
    }));
  };

  const handleSave = () => {
    console.log('Saved Data:', formData);
    profileUpdate(formData);
  };

  return (
    <div className="bg-gray-200 min-h-screen py-10">
      <Navbar />
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden mt-10">
        {/* Header Section */}
        <div className="p-6 bg-orange-50">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-md"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">{name}</h1>
              <p className="text-sm md:text-base text-gray-600">{jobTitle}</p>
              <div className="flex items-center space-x-2 md:space-x-4 mt-2">
                <FaMapMarkerAlt className="text-lg md:text-xl text-gray-700" />
                <span className="text-sm md:text-base text-gray-700">{location}</span>
              </div>
              <div className="mt-4">
                <p className="flex items-center text-sm md:text-base text-gray-600">
                  <FaEnvelope className="mr-1 md:mr-2 text-lg md:text-xl" />
                  {contactEmail}
                </p>
                <p className="flex items-center text-sm md:text-base text-gray-600 mt-2">
                  <FaPhone className="mr-1 md:mr-2 text-lg md:text-xl" />
                  {contactPhone}
                </p>
              </div>
              <Button
                text={showAddDetails ? 'Hide Details' : 'Add Details'}
                className="mt-4"
                onClick={() => setShowAddDetails(!showAddDetails)}
              />
            </div>
          </div>
        </div>

        {/* Navigation and Content Sections */}
        <div className="mt-6 px-6">
         

          <div className="p-6 bg-white rounded-lg shadow">
            {showAddDetails && (
              <div className="space-y-4 mb-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">Add Details</h2>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full p-2 border rounded-lg text-sm md:text-base"
                  />
                  <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    placeholder="Gender"
                    className="w-full p-2 border rounded-lg text-sm md:text-base"
                  />
                 
                </div>

                {formData.address.map((addr, index) => (
                  <div key={index} className="p-4 bg-gray-100 rounded-lg">
                    <h3 className="text-md md:text-lg font-semibold text-gray-700 mb-2">Address {index + 1}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <input
                        type="text"
                        name="buildingNumber"
                        value={addr.buildingNumber}
                        onChange={(e) => handleAddressChange(index, e)}
                        placeholder="Building Number"
                        className="w-full p-2 border rounded-lg text-sm md:text-base"
                      />
                      <input
                        type="text"
                        name="city"
                        value={addr.city}
                        onChange={(e) => handleAddressChange(index, e)}
                        placeholder="City"
                        className="w-full p-2 border rounded-lg text-sm md:text-base"
                      />
                      <input
                        type="text"
                        name="pincode"
                        value={addr.pincode}
                        onChange={(e) => handleAddressChange(index, e)}
                        placeholder="Pincode"
                        className="w-full p-2 border rounded-lg text-sm md:text-base"
                      />
                      <input
                        type="text"
                        name="state"
                        value={addr.state}
                        onChange={(e) => handleAddressChange(index, e)}
                        placeholder="State"
                        className="w-full p-2 border rounded-lg text-sm md:text-base"
                      />
                    </div>
                  </div>
                ))}

                <Button
                  text="Add Address"
                  className="mt-4"
                  onClick={handleAddAddress}
                />
                <Button
                  text="Save"
                  className="mt-4"
                  onClick={handleSave}
                />
              </div>
            )}

         
          </div>
          <div className="relative flex flex-wrap justify-around bg-orange-200 p-2 md:p-4 mb-6 rounded-lg shadow">
            {['bookings', 'security', 'wallet'].map((tab) => (
              <div
                key={tab}
                className="relative text-sm md:text-lg font-semibold px-3 md:px-4 py-1 md:py-2 cursor-pointer group"
                onClick={() => setActiveTab(tab as 'bookings' | 'security' | 'wallet')}
              >
                <div
                  className={`flex items-center ${activeTab === tab ? 'text-gray-900' : 'text-gray-600'} transition`}
                >
                  {tab === 'bookings' && <FaListAlt className="mr-1 md:mr-2 text-lg md:text-xl" />}
                  {tab === 'security' && <FaShieldAlt className="mr-1 md:mr-2 text-lg md:text-xl" />}
                  {tab === 'wallet' && <FaWallet className="mr-1 md:mr-2 text-lg md:text-xl" />}
                  {tab === 'bookings' && 'My Bookings'}
                  {tab === 'security' && 'Security'}
                  {tab === 'wallet' && 'Wallet'}
                </div>
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-orange-500 transition-transform duration-300 ${activeTab === tab ? 'w-full' : 'w-0'} origin-left`}
                />
              </div>
            ))}
            
          </div>
          {activeTab === 'bookings' && (
              <div className="text-gray-600">Booking details here</div>
            )}
            {activeTab === 'security' && (
              <div className="text-gray-600">Security settings here</div>
            )}
            {activeTab === 'wallet' && (
              <div className="text-gray-600">Wallet balance: {walletBalance}</div>
            )}
        </div>
        
      </div>
      
    </div>
  );
};

export default ProfilePage;
 