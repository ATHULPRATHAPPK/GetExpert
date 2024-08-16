// src/application/services/userService.ts

import api from '../../infrastructure/api/user/userApi';


export const fetchUserProfile = async (email: string) => {
  try {
    if (!email) {
      throw new Error('User email is not provided.');
    }
    const response = await api.post('/users/profile', { email });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (profileData: { name: string; email: string }) => {
  try {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
