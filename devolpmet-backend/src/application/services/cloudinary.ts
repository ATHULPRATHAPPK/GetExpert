import { Request, Response, NextFunction } from 'express';
import { cloudinaryIntaerface } from '../../interface/serviceInterface/cloudinaryInterface';
import { v2 as cloudinary } from 'cloudinary';
import { CLOUD_API_KEY, CLOUD_NAME, CLOUD_API_SECTRET } from '../../infrastructure/constants/env';
import { config } from 'dotenv';

config();

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECTRET,
});


export class Cloudinary implements cloudinaryIntaerface{

    constructor(){}

    uploadImage = async (filePath: string) => {
        return cloudinary.uploader.upload(filePath, {
          folder: 'profile_pics',
        });
      };

      uploadProof = async (filePath: string) => {
        return cloudinary.uploader.upload(filePath, {
          folder: 'proof_pics',
        });
      };  

      uploadProfessionalLicense = async (filePath: string) => {
        return cloudinary.uploader.upload(filePath, {
          folder: 'professionalLicense',
        });
      };

      uploadCertificate = async (filePath: string) => {
        return cloudinary.uploader.upload(filePath, {
          folder: 'certificate',
        });
      };
      
}









