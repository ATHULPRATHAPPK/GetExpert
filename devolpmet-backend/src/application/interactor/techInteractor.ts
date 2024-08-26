import { ITechRepo } from "../../interface/techInterface/ITechRepo";
import { jwtInterface } from "../../interface/serviceInterface/jwtInterface";
import { bcryptInterface } from "../../interface/serviceInterface/bcryptInterface";
import { IMailer } from "../../interface/serviceInterface/mailerInterface";
import { Tech } from "../../domain/entities/tech";
import { redisClient } from "../../infrastructure/security/redis/redisClient";
import { generateOTP } from "../../infrastructure/security/otp/otpService";
import { ITechInteractor } from "../../interface/techInterface/ITechInteractor";

export class TechIntractor implements ITechInteractor {
  private repository: ITechRepo;
  private hashPassword: bcryptInterface;
  private jwt: jwtInterface;
  private sendEmail: IMailer;

  constructor(
    repository: ITechRepo,
    hashPassword: bcryptInterface,
    jwt: jwtInterface,
    sendEmail: IMailer
  ) {
    this.repository = repository;
    this.hashPassword = hashPassword;
    this.jwt = jwt;
    this.sendEmail = sendEmail;
  }

  async registerTech(data: Tech): Promise<any> {
    try {
      console.log("reched intractor..");
      const existingData = await redisClient.get(`tech:${data.email}`);
      console.log("Existing data check:", existingData);

      if (existingData) {
        throw new Error("User data is already in the process of registration");
      }
      const existingUser = await this.repository.findTech(data.email);
      if (existingUser) {
        throw new Error("User already exists");
      }
      const otp = generateOTP();
      console.log(otp, "otp generated");
      await this.sendEmail.sendEmail(data.email, "otp", otp);
      const techDataWithOtp = { ...data, otp };
      const result = await redisClient.setEx(
        `tech:${data.email}`,
        600,
        JSON.stringify(techDataWithOtp)
      );
      console.log("Redis set result:", result);
      return "User registered successfully";
    } catch (error) {
      console.error("Error during user registration:", error);
      throw error;
    }
  }

  async verifyOTP(email: string, otp: string): Promise<any> {
    console.log("working otp");
    console.log(otp);
    console.log(email);
    try {
      const keyExists = await redisClient.exists(`tech:${email}`);

      if (keyExists === 0) {
        throw new Error("OTP expired or user not found");
      }
      const cachedUserData = await redisClient.get(`tech:${email}`);
      console.log("Redis data:", cachedUserData);

      if (!cachedUserData) {
        throw new Error("OTP expired or user not found");
      }
      const techData = JSON.parse(cachedUserData);
      console.log("Parsed Redis data:", techData);
      if (techData.otp !== otp) {
        throw new Error("Invalid OTP");
      }

      const hashPassword = await this.hashPassword.encryptPassword(
        techData.password as string
      );
      console.log("hashPassword", hashPassword);

      const newTech = Tech.newTech(
        techData.username,
        techData.email,
        hashPassword,
        false,
        true
      );
      const register = await this.repository.registerTech(newTech);
      console.log("register", register);
      return "OTP verified successfully. Proceeding with registration.";
    } catch (error) {
      console.error("Error during OTP verification:", error);
      throw error; // Re-throw the error to be handled by the calling function or middleware
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const techData = await this.repository.findTech(email);
      const comparePassword = await this.hashPassword.comparePassword(
        password,
        techData.password
      );
     if(!comparePassword){
      return {
        success: false,
        message: "User logged in failed.",
      };
     }
      const accessToken = this.jwt.generateToken({ id: techData.id }, "1h");
      const refreshToken = this.jwt.generateToken({ id: techData.id }, "30d");
      console.log(" accessToken", accessToken);
      console.log(" refreshToken", refreshToken);
      return {
        success: true,
        message: "User logged in successfully.",
        tokens: { accessToken, refreshToken },
        userDetails: {
          email: techData.email,
        },
      };
    } catch (error) {
      throw new Error("an error occured while login..");
    }
  }
}
