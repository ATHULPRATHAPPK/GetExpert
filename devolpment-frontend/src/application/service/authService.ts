import axios from "axios";
import api from "../../infrastructure/api/user/userApi";


//=========================================user register =================//
export const registerUser = async (userData: {
  email: string;
  password: string;
  username: string;
  mobileNumber: string;
}) => {
  try {
    const response = await api.post("/users/register", userData);
    console.log(response);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data?.error || "Registration failed");
      }
      throw new Error(error.message || "An unexpected error occurred");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

//=========================================otp sumbmitting =================//
export const verifyOtp = async (otp: string, email: string) => {
  try {
    console.log("verify otp function caling...");
    const response = await api.post("/users/otp-verify", { otp, email });
    console.log("response", response);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data?.error || "OTP verification failed"
        );
      }
      throw new Error(error.message || "An unexpected error occurred");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};


//=========================================user login =================//
export const loginUser = async (email:string, password:string)=>{
    try{
        console.log("user login function caling...");
        const response = await api.post("/users/login",{email,password})
        return response.data
    }catch(error){
          console.log("login failed...");       
          console.log(error);
    }
}