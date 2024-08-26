// src/application/services/userService.ts

import axios from "axios";
import api from "../../../infrastructure/api/user/userApi";
import { FormData } from "../../../interface/pages/user/profile";

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

// export const updateUserProfile = async (profileData: { name: string; email: string }) => {
//   try {
//     const response = await api.put('/users/profile', profileData);
//     return response.data;
//   } catch (error) {
//     console.error('Error updating user profile:', error);
//     throw error;
//   }
// };


export const profileUpdate = async(data:FormData)=>{
 console.log(data);
 try{
 const response = await api.put('users/update-profile',data)
 console.log(response);
 
 }catch(error){
  console.error('Error fetching user profile:', error);
  throw error;
 }
 
}