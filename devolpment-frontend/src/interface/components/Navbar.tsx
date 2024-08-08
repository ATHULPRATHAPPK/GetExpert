import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-orange-600">
          GetExpert
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-gray-700 hover:text-orange-600">Login</Link>
          <Link to="/register" className="text-gray-700 hover:text-orange-600">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
