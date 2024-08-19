import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../state/store';
import { updateUserProfile } from '../../../application/service/user/userService';
import InputField from '../../components/InputField';
import Button from '../../components/Button';

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await updateUserProfile({ name, email });
      if (response.success) {
        setSuccessMessage('Profile updated successfully.');
      } else {
        setError('Failed to update profile.');
      }
    } catch (error) {
      setError('An error occurred while updating the profile.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      
      <form onSubmit={handleUpdateProfile} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <InputField
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <InputField
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button text="Update Profile" className="w-full bg-blue-500 text-white" />
      </form>
    </div>
  );
};

export default Profile;
