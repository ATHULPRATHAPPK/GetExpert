import React, { useState, useCallback } from "react";
import debounce from "lodash/debounce";
import axios from "axios";

const professionalAreas = {
  electrician: ["Wiring", "Lighting", "Appliance Repair"],
  plumber: ["Pipes", "Drainage", "Water Heater"],
  carpenter: ["Furniture Repair", "Cabinet Making", "Woodwork"],
  all: ["General Maintenance", "Multiple Skills"],
};

const RegistrationForm: React.FC = () => {
  const [pincode, setPincode] = useState('');
  const [data, setData] = useState<{ District: string, Block: string }[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedProfessionalArea, setSelectedProfessionalArea] = useState('');
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    district: '',
    pincode: '',
    preferredArea: '',
    workDetails: '',
    profilePhoto: null as File | null,
    idProof: null as File | null,
    professionalLicense: null as File | null,
    certificate1: null as File | null,
    certificate2: null as File | null,
  });
  const [error, setError] = useState('');

  // Debounced function to fetch pincode data
  const debouncedPincodeSubmit = useCallback(
    debounce(async (pincode: string) => {
      if (pincode.length !== 6) {
        setData([]);
        setError('Invalid Pincode');
        return;
      }
      try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
        console.log('Response:', response.data);
        if (response.data[0].Status === "Success" && response.data[0].PostOffice.length > 0) {
          const postOffices = response.data[0].PostOffice.map((postOffice: any) => ({
            District: postOffice.District,
            Block: postOffice.Block
          }));
          setData(postOffices);
          setError('');
        } else {
          setData([]);
          setError('Invalid Pincode');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
        setError('Error fetching data');
      }
    }, 2000), // 2 seconds debounce delay
    []
  );

  // Function to handle pincode input change
  const handleChangePincode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPincode = e.target.value;
    setPincode(newPincode);
    debouncedPincodeSubmit(newPincode);
  };

  // Function to handle input changes for the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleProfessionalAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const area = e.target.value;
    setSelectedProfessionalArea(area);
    setSelectedSubcategories([]); // Reset subcategories when professional area changes
  };

  // Function to handle subcategory selection
  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategories(prev =>
      prev.includes(subcategory)
        ? prev.filter(sc => sc !== subcategory)
        : [...prev, subcategory]
    );
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Construct the full form data including subcategories
    const completeFormData = {
      ...formData,
      district: selectedDistrict,
      block: selectedBlock,
      preferredArea: selectedProfessionalArea,
      subcategories: selectedSubcategories,
    };

    // Display form data in the console
    console.log('Form Data Submitted:', completeFormData);

    try {
      // Replace with your actual API endpoint
      const response = await axios.post('/your-api-endpoint', completeFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Server Response:', response.data);

      // Handle successful submission, such as displaying a success message
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error, such as displaying an error message
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Technician Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 mb-2 font-semibold" htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your address"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-semibold" htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your city"
            />
          </div>

          <div>
            <div className="text-xl font-bold mb-6 text-center mt-10">Preferred area for working</div>
            <label className="block text-gray-700 mb-2 font-semibold" htmlFor="pincode">Pincode:</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={pincode}
              onChange={handleChangePincode}
              placeholder="Enter your pincode"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Display district and block information in a select box */}
        {data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold" htmlFor="districtSelect">District:</label>
              <select
                id="districtSelect"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select District</option>
                {data.map((item, index) => (
                  <option key={index} value={item.District}>
                    {item.District}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-semibold" htmlFor="blockSelect">Block:</label>
              <select
                id="blockSelect"
                value={selectedBlock}
                onChange={(e) => setSelectedBlock(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select Block</option>
                {data.filter(item => item.District === selectedDistrict).map((item, index) => (
                  <option key={index} value={item.Block}>
                    {item.Block}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Display error message if applicable */}
        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-semibold" htmlFor="workDetails">Work Details:</label>
          <textarea
            id="workDetails"
            name="workDetails"
            value={formData.workDetails}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your work details"
            rows={4}
          />
        </div>

        {/* Professional Area and Subcategories */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-semibold" htmlFor="professionalArea">Professional Area:</label> <select id="professionalArea" value={selectedProfessionalArea} onChange={handleProfessionalAreaChange} className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500" > <option value="">Select Professional Area</option> {Object.keys(professionalAreas).map((area, index) => ( <option key={index} value={area}> {area.charAt(0).toUpperCase() + area.slice(1)} </option> ))} </select> </div>
          {selectedProfessionalArea && (
      <div className="mb-6">
        <p className="font-semibold mb-2">Subcategories:</p>
        {professionalAreas[selectedProfessionalArea].map((subcategory, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`subcategory-${index}`}
              checked={selectedSubcategories.includes(subcategory)}
              onChange={() => handleSubcategoryChange(subcategory)}
              className="mr-2"
            />
            <label htmlFor={`subcategory-${index}`} className="text-gray-700">{subcategory}</label>
          </div>
        ))}
      </div>
    )}

    {/* File Uploads */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div>
        <label className="block text-gray-700 mb-2 font-semibold" htmlFor="profilePhoto">Profile Photo:</label>
        <input
          type="file"
          id="profilePhoto"
          name="profilePhoto"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2 font-semibold" htmlFor="idProof">ID Proof:</label>
        <input
          type="file"
          id="idProof"
          name="idProof"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2 font-semibold" htmlFor="professionalLicense">Professional License:</label>
        <input
          type="file"
          id="professionalLicense"
          name="professionalLicense"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2 font-semibold" htmlFor="certificate1">Certificate 1:</label>
        <input
          type="file"
          id="certificate1"
          name="certificate1"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2 font-semibold" htmlFor="certificate2">Certificate 2:</label>
        <input
          type="file"
          id="certificate2"
          name="certificate2"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
    </div>

    <button
      type="submit"
      className="w-full bg-orange-500 text-white p-3 rounded hover:bg-orange-600 transition-colors"
    >
      Submit
    </button>
  </form>
</div>
); };

export default RegistrationForm;