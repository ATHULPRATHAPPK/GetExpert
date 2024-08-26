import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';
import { clearUser } from '../../state/user/userSlice'; 
import { fetchUserProfile } from '../../application/service/user/userService';
import { FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaBars } from 'react-icons/fa';
import SearchBox from '../components/SearchBox';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(clearUser()); 
    navigate('/login'); 
  };

  const handleProfileClick = async () => {
    try {
      if (user.email) {
        const response = await fetchUserProfile(user.email);
        if (response.success) {
          navigate("/profile");
        } else {
          console.log("Failed to fetch profile:", response.message);
        }
      } else {
        console.error("User email is not available.");
      }
    } catch (err) {
      console.log(err);
      handleLogout();
    }
  };

  const handleSearch = (query: string) => {
  
    console.log('Searching for:', query);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-orange-400 to-orange-600 shadow-lg z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          GetExpert
        </Link>
        
        <div className="flex items-center ml-auto space-x-4 px-10">
          <SearchBox 
            className="hidden md:flex max-w-xs" 
            placeholder="Search for services..."
            onSearch={handleSearch} 
            style={{ marginRight: '160px' }}  
          />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <FaBars size={24} />
          </button>
        </div>

        <div className={`flex items-center space-x-4 ${menuOpen ? 'block' : 'hidden'} md:flex`}>
          {user.email ? (
            <>
              <span
                onClick={handleProfileClick}
                className="text-white cursor-pointer hover:text-orange-200 flex items-center space-x-2"
              >
                <FaUser />
                <span className="hidden md:inline">{user.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className="text-white hover:text-orange-200 flex items-center space-x-2"
              >
                <FaSignOutAlt />
                <span className="hidden md:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-orange-200 flex items-center space-x-2">
                <FaSignInAlt />
                <span className="hidden md:inline">Login</span>
              </Link>
              <Link to="/register" className="text-white hover:text-orange-200 flex items-center space-x-2 ml-4">
                <FaUserPlus />
                <span className="hidden md:inline">Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
