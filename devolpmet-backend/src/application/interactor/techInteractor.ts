import { ITechRepo } from "../../interface/techInterface/ITechRepo";
import { jwtInterface } from "../../interface/serviceInterface/jwtInterface";
import { bcryptInterface } from "../../interface/serviceInterface/bcryptInterface";
import { IMailer } from "../../interface/serviceInterface/mailerInterface";
import { cloudinaryIntaerface } from "../../interface/serviceInterface/cloudinaryInterface";
import { Tech } from "../../domain/entities/tech";
import { redisClient } from "../../infrastructure/security/redis/redisClient";
import { generateOTP } from "../../infrastructure/security/otp/otpService";
import { ITechInteractor } from "../../interface/techInterface/ITechInteractor";
import { Cloudinary } from "../services/cloudinary";
import { emit } from "process";
import { log } from "console";

export class TechIntractor implements ITechInteractor {
  private repository: ITechRepo;
  private hashPassword: bcryptInterface;
  private jwt: jwtInterface;
  private sendEmail: IMailer;
  private cloudinary: cloudinaryIntaerface;

  constructor(
    repository: ITechRepo,
    hashPassword: bcryptInterface,
    jwt: jwtInterface,
    sendEmail: IMailer,
    cloudinary: cloudinaryIntaerface
  ) {
    this.repository = repository;
    this.hashPassword = hashPassword;
    this.jwt = jwt;
    this.sendEmail = sendEmail;
    this.cloudinary = cloudinary;
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
      if (!comparePassword) {
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

  async documentUpdate(body: any, file: any): Promise<any> {
    console.log("reached intractor...");
    console.log("body", body);

    // Upload files to Cloudinary
    const uploadedProfilePhoto = file.profilePhoto?.[0]?.path
      ? this.cloudinary.uploadImage(file.profilePhoto[0].path)
      : Promise.resolve(null);

    const uploadedIdProof = file.idProof?.[0]?.path
      ? this.cloudinary.uploadProof(file.idProof[0].path)
      : Promise.resolve(null);

    const uploadedProfessionalLicense = file.professionalLicense?.[0]?.path
      ? this.cloudinary.uploadProfessionalLicense(
          file.professionalLicense[0].path
        )
      : Promise.resolve(null);

    const uploadedCertificate1 = file.certificate1?.[0]?.path
      ? this.cloudinary.uploadCertificate(file.certificate1[0].path)
      : Promise.resolve(null);

    const uploadedCertificate2 = file.certificate2?.[0]?.path
      ? this.cloudinary.uploadCertificate(file.certificate2[0].path)
      : Promise.resolve(null);

    // Await all uploads
    const [
      profilePhotoUrl,
      idProofUrl,
      professionalLicenseUrl,
      certificate1Url,
      certificate2Url,
    ] = await Promise.all([
      uploadedProfilePhoto,
      uploadedIdProof,
      uploadedProfessionalLicense,
      uploadedCertificate1,
      uploadedCertificate2,
    ]);

    // Find existing technician by email
    const existingTech = await this.repository.findTech(body.email);
    if (!existingTech) {
      throw new Error("Technician not found.");
    }

    // Prepare the update data according to the updated schema
    const updateData = {
      address: {
        place: body.address,
        city: body.city,
      },
      profilePhotoUrl:
        profilePhotoUrl?.secure_url || existingTech.profilePhotoUrl,
      professionInfo: {
        profession: body.profession,
        subcategories: body.subcategories,
      },
      preferredWorkPlace: {
        district: body.district,
        block: body.block,
        pincode: body.pincode,
      },
      documents: {
        idProofUrl:
          idProofUrl?.secure_url || existingTech.documents?.idProofUrl,
        professionalLicenseUrl:
          professionalLicenseUrl?.secure_url ||
          existingTech.documents?.professionalLicenseUrl,
        certificate1Url:
          certificate1Url?.secure_url ||
          existingTech.documents?.certificate1Url,
        certificate2Url:
          certificate2Url?.secure_url ||
          existingTech.documents?.certificate2Url,
      },
      documentSubmited: true,
    };

    // Update technician's document in the database
    const updatedTech = await this.repository.updateTech(
      existingTech._id,
      updateData
    );
    console.log("updatedTech", updatedTech);

    // Return the updated technician data
    return updatedTech;
  }

  async techData(data: any): Promise<any> {
    console.log(data,"data");
    
    const existingUser = await this.repository.findTech(data.email);

    if (!existingUser) {
      throw new Error("User already exists");
    }
  return {
    documentSubmited: existingUser.documentSubmited,
    email:existingUser.email,
    techName:existingUser.userName,
  }
    
  }
}
