import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-orange-100 py-6">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-orange-600">GetExpert</h2>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-700">About Us</a>
            <a href="#" className="text-gray-700">For Experts</a>
            <a href="#" className="text-gray-700">For Tutors</a>
            <a href="#" className="text-gray-700">Support</a>
          </div>
        </div>
        <div className="text-gray-700">
          <p>&copy; 2024 GetExpert. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
