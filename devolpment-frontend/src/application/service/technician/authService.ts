import api from "../../../infrastructure/api/tech/techApi"
import axios from "axios";
export const  loginTech = async (email:string, password:string)=>{
    console.log("tech login function caling...");
    const response = await api.post("/login",{email,password})
    return response.data
}

export const registerTech = async (techData: {
    email: string;
    password: string;
    username: string;
    mobileNumber: string;
  }) => {
    try {
      const response = await api.post("/register", techData);
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
    const response = await api.post("/otp-verify", { otp, email });
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