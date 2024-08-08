import React from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField';
import Button from '../../components/Button';

import '../../styles/index.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    console.log('Sign in clicked');
  };

  const handleGoogleSignInClick = () => {
    console.log('Google Sign in clicked');
  };

  const handleSignUpClick = () => {
    navigate('/register');
  };

  return (
    <div className="relative flex flex-col lg:flex-row h-screen bg-gray-50">
      <div className="hidden lg:flex flex-col items-center justify-center lg:w-1/2 w-full bg-orange-100">
        <img src="path_to_your_image" alt="GetExpert" className="w-1/2 mb-8" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-md w-11/12 lg:w-[28rem]">
          <h2 className="text-2xl font-semibold mb-4">Welcome to GetExpert</h2>
          <h1 className="text-3xl font-bold mb-6">Sign in</h1>
          <form>
            <div className="mb-4">
              <InputField type="email" placeholder="email address" />
            </div>
            <div className="mb-4">
              <InputField type="password" placeholder="Password" />
            </div>
            <div className="flex justify-between items-center mb-4">
              <Button text="Sign in" className="w-full" onClick={handleSignInClick} />
            </div>
            <div className="text-center mb-4">
              <a href="#" className="text-sm text-orange-500">
                Forgot Password?
              </a>
            </div>
            <div className="text-center mb-4">
              <p>
                No Account?{' '}
                <button type="button" onClick={handleSignUpClick} className="text-orange-500">
                  Sign up
                </button>
              </p>
            </div>
          </form>
          <div className="flex items-center justify-center my-4">
            <span className="border-t border-gray-300 flex-grow"></span>
            <span className="mx-4 text-gray-500">OR</span>
            <span className="border-t border-gray-300 flex-grow"></span>
          </div>
          <div className="flex justify-center">
            <Button text="Sign in with Google" className="bg-orange-100 text-orange-500" onClick={handleGoogleSignInClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
