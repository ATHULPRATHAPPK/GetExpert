import React from 'react';
import { Link } from 'react-router-dom';

interface MenuItem {
  path: string;
  label: string;
}

interface SidebarProps {
  title: string;
  menuItems: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ title, menuItems }) => {
  return (
    <div className="sidebar bg-gray-900 text-white h-screen p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-8">{title} Dashboard</h2>
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <li key={index} className="group">
            <Link
              to={item.path}
              className="flex items-center p-3 rounded-lg text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200 ease-in-out"
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li   className="flex items-center p-3 rounded-lg text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200 ease-in-out"
            >LogOut</li>
      </ul>
    </div>
  );
};

export default Sidebar;
