import { IUserRepo } from "../../interface/userInterface/IUserRepo";
import { jwtInterface } from "../../interface/serviceInterface/jwtInterface";
import { bcryptInterface } from "../../interface/serviceInterface/bcryptInterface";
import { IMailer } from "../../interface/serviceInterface/mailerInterface";
import { User } from "../../domain/entities/userSchema"; // Import correct User schema/entity
import { redisClient } from "../../infrastructure/security/redis/redisClient";
import { generateOTP } from "../../infrastructure/security/otp/otpService";
import { IUserInteractor } from "../../interface/userInterface/IUserInteractor";
import {UpdateProfileResult} from "../../domain/entities/User"

export class UserInteractor implements IUserInteractor {
  private repository: IUserRepo;
  private hashPassword: bcryptInterface;
  private jwt: jwtInterface;
  private sendEmail: IMailer;

  constructor(
    repository: IUserRepo,
    hashPassword: bcryptInterface,
    jwt: jwtInterface,
    sendEmail: IMailer
  ) {
    this.repository = repository;
    this.hashPassword = hashPassword;
    this.jwt = jwt;
    this.sendEmail = sendEmail;
  }

  async registerUser(data: User): Promise<any> {
    try {
      const existingData = await redisClient.get(`user:${data.email}`);
      console.log("Existing data check:", existingData);

      if (existingData) {
        throw new Error("User data is already in the process of registration");
      }

      console.log("Registration process started...");
      const existingUser = await this.repository.findUser(data.email);

      if (existingUser) {
        throw new Error("User already exists");
      }
      const otp = generateOTP();
      console.log(otp, "otp generated");

      await this.sendEmail.sendEmail(data.email, "otp", otp);

      const userDataWithOtp = { ...data, otp };
      const result = await redisClient.setEx(
        `user:${data.email}`,
        600,
        JSON.stringify(userDataWithOtp)
      );
      console.log("Redis set result:", result);

      return "User registered successfully";
    } catch (error) {
      console.error("Error during user registration:", error);
      throw error;
    }
  }

  async verifyOTP(email: string, otp: string): Promise<any> {
    try {
      console.log("working otp");
      console.log(otp);
      console.log(email);
      const keyExists = await redisClient.exists(`user:${email}`);
      console.log("Key existence check:", keyExists);
      if (keyExists === 0) {
        throw new Error("OTP expired or user not found");
      }

      const cachedUserData = await redisClient.get(`user:${email}`);
      console.log("Redis data:", cachedUserData);

      if (!cachedUserData) {
        throw new Error("OTP expired or user not found");
      }
      const userData = JSON.parse(cachedUserData);
      console.log("Parsed Redis data:", userData);

      if (userData.otp !== otp) {
        throw new Error("Invalid OTP");
      }

      const hashPassword = await this.hashPassword.encryptPassword(
        userData.password as string
      );
      console.log("hashPassword", hashPassword);

      const newUser = User.newUser(
        userData.username,
        userData.email,
        hashPassword,
        false,
        true
      );

      const register = await this.repository.registerUser(newUser);
      console.log("register", register);
      return "OTP verified successfully. Proceeding with registration.";
    } catch (error) {
      console.error("Error during OTP verification:", error);
      throw error; // Re-throw the error to be handled by the calling function or middleware
    }
  }

  async login(email: string, password: string): Promise<any> {
    console.log("actualy working this code...");
    try {
      const userData = await this.repository.findUser(email);
      const comparePassword = await this.hashPassword.comparePassword(
        password,
        userData.password
      );

      if (!comparePassword) {
        return {
          success: false,
          message: "User logged in failed.",
        };
      }

      const accessToken = this.jwt.generateToken({ id: userData.id }, "1h");
      const refreshToken = this.jwt.generateToken({ id: userData.id }, "30d");

      console.log(" accessToken", accessToken);
      console.log(" refreshToken", refreshToken);

      return {
        success: true,
        message: "User logged in successfully.",
        tokens: { accessToken, refreshToken },
        userDetails: {
          userName: userData.userName,
          email: userData.email,
        },
      };
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error("An error occurred while logging in.");
    }
  }


  async userProfile(email: string): Promise<any> {
    try {
      console.log("Reached interactor...");
      const userData = await this.repository.findUser(email);
      return {
        success: true,
        message: "User exist.",
        userDetails: {
          userName: userData.userName,
          email: userData.email,
        },
      };
    } catch (error) {
      console.error("Error during user profile retrieval:", error);
      return {
        success: false,
        message: "An error occurred while retrieving the user profile.",
      };
    }
  }


async updateProfile(data: User): Promise<UpdateProfileResult> {
    console.log("reached profile",data);
    try {
        const existingUser = await this.repository.findUser(data.email);
        console.log(existingUser);

        if (!existingUser) {
            return {
                success: false,
                message: "User not found."
            };
        }

        // Update the existing user's details
        if (data.name) existingUser.userName = data.name;
        if (data.phoneNumber) existingUser.phone = data.phoneNumber;
        if (data.gender) existingUser.gender = data.gender;
        if (data.profilePhotoUrl) existingUser.profilePhotoUrl = data.profilePhotoUrl;
        if (data.address) existingUser.address = data.address;

        // Save the updated user document
        await this.repository.updateUser(existingUser);

        return {
            success: true,
            message: "Profile updated successfully.",
            updatedUser: existingUser
        };
    } catch (error) {
        console.error("Error during user profile update:", error);
        return {
            success: false,
            message: "An error occurred while updating the user profile."
        };
    }
}



}
