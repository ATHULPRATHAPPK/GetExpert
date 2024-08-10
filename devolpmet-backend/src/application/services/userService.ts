import { createUser, findUserByEmail } from "../../domain/repositories/userRepo";
import { IUser } from "../../domain/entities/User";
import bcrypt from "bcryptjs";
import { redisClient } from "../../infrastructure/redis/redisClient";
import { generateOTP, sendOTP } from "../../infrastructure/otp/otpService";

export const registerUser = async (userData: IUser) => {
  // Check if user data is already in Redis
  const cachedUserData = await redisClient.get(`user:${userData.email}`);
  if (cachedUserData) {
    throw new Error("User data is already in the process of registration");
  }

  // Check if the user already exists in the database
  const existingUser = await findUserByEmail(userData.email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Generate OTP and send it to the user’s email
  const otp = generateOTP();
  await sendOTP(userData.email, otp);

  // Store the user data and OTP in Redis for 10 minutes (600 seconds)
  const userDataWithOtp = { ...userData, otp };
  await redisClient.setEx(
    `user:${userData.email}`,
    600,
    JSON.stringify(userDataWithOtp)
  );
  // Hash the password (This will be saved after OTP verification)
  return "OTP sent. Please verify to complete registration.";
};

export const verifyUserOtp = async (email: string, otp: string) => {
  // Retrieve user data and OTP from Redis
  const cachedUserData = await redisClient.get(`user:${email}`);

  if (!cachedUserData) {
    throw new Error("OTP expired or user not found");
  }

  const userData = JSON.parse(cachedUserData);

  if (userData.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  // OTP is valid, save the user data to MongoDB
  userData.password = await bcrypt.hash(userData.password, 10);
  const newUser = await createUser({
    email: userData.email,
    password: userData.password,
    ...userData,
  });

  // Remove user data from Redis after successful verification
  await redisClient.del(`user:${email}`);
  return "User registered successfully";
};



//=========================================login service =================//

export const loginUser = async (email: string, password: string) => {
  try {
    const existingUser = await findUserByEmail(email);
    console.log("User found:", existingUser);
    if (!existingUser) {
      throw new Error("Invalid email or password.");
    }
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    console.log("Password match:", isPasswordCorrect);
    if (!isPasswordCorrect) {
      return { success: false, message: "Invalid password." };
    }
    return { success: true, message: "User logged in successfully." };
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("An error occurred while logging in.");
  }
};