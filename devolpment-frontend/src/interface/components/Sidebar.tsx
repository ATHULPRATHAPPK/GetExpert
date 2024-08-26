import React from 'react';
import { Link } from 'react-router-dom';

interface MenuItem {
  path: string;
  label: string;
  icon: JSX.Element;
}

interface SidebarProps {
  title: string;
  menuItems: MenuItem[];
  className: string;
  classElements: string;
}

const Sidebar: React.FC<SidebarProps> = ({ title, menuItems, className, classElements }) => {
  return (
    <div className={`sidebar bg-white text-gray-900 h-screen p-6 shadow-lg ${className}`}>
     <h2 className={`text-2xl font-bold mb-8 ${classElements}`}>
  {title} Dashboard
</h2>

      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <li key={index} className="group">
            <Link
              to={item.path}
              className={`flex items-center p-3 rounded-lg text-base font-medium border  ${classElements}`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <button 
            className={`flex items-center p-3 rounded-lg text-base font-medium border border-gray-300 ${classElements}`}
            onClick={() => alert('Logged out')}
          >
            LogOut
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
