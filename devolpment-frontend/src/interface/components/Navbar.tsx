import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';
import { clearUser } from '../../state/user/userSlice'; 
import { fetchUserProfile } from '../../application/service/userService';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(clearUser()); 
    navigate('/login'); 
  };

  const handleProfileClick = async()=>{
    try{
      const response = await fetchUserProfile();
      console.log(response,"responce");
      
      if(response.success){
        console.log("reched suceess");
        
        navigate("/profile")
      }
    }catch(err){
      console.log(err);
      navigate("/login")
    }
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-orange-600">
          GetExpert
        </Link>

        <div className="flex items-center space-x-4">
          {user.email ? (
            <>
               <span
                onClick={handleProfileClick}
                className="text-gray-700 cursor-pointer hover:text-orange-600"
              >
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-orange-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-orange-600">
                Login
              </Link>
              <Link to="/register" className="text-gray-700 hover:text-orange-600">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
