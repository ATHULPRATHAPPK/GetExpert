// src/application/services/userService.ts

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

export const serviceRequired = async (name: string | null, email:string |null) => {
  if (!name) {
    console.error("Service name is undefined or null.");
    return { data: { status: false, message: "Service not available" } }; // Default return for undefined service
  }

  try {
    const result = await api.post('/users/service-required', { name,email });
    console.log("Service fetched successfully:", result.data.result.address); 
    console.log("Service fetched successfully:", result);
    return result;
  } catch (error) {
    console.error("Error fetching service details", error);
    return { data: { status: false, message: "Error fetching service details" } }; // Return error message in the result
  }
};


export const serviceSelection = async (data: any) => {
  try {  const response = await api.post('/users/service-selection', { data });

  
    const responseData = response.data;

    // Log the response data to ensure it's coming through correctly
    console.log(responseData, "responseData");

    // Check if the status is true and the result array has data
    if (responseData.status && responseData.result && responseData.result.length > 0) {
      console.log("Booking successful:", responseData.result);
      // Return the result for further use
      return responseData;
    } else {
      console.log("No technicians found.");
      return null;
    }

  } catch (error) {
    // Handle any errors from the request
    console.error("Error during service selection:", error);
    throw error;
  }

};


export const paymentCompleted = async (techData: any, bookingData: any) => {
  try {
    const response = await api.post('/users/booking-payment', { techData, bookingData });
    
    if (response.data.status === true) {
      return response.data;
    }
  } catch (error) {
    console.error("Error during payment:", error);
    throw error;
  }
};
