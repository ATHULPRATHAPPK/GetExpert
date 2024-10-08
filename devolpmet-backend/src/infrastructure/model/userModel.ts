import { UserAddress } from "../../domain/entities/userAddress";
import mongoose  from "mongoose";
import { Schema,Document } from "mongoose";
import { Model } from "mongoose";
import { string } from "zod";

export interface IuserDocument extends Document{
    email: string;
    userName: string;
    password: string;
    address?: string;
    createdAt: Date;
    phone?: string;
    gender?: string;
    profilePhotoUrl?:string;
    updateAt: Date;
    blocked:boolean;
    verified:boolean
}



const userSchema:Schema = new Schema<IuserDocument>(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        userName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            default: null
        },
        blocked: {
            type: Boolean
        },
        verified: {
            type: Boolean,
            default: false
        },
        address: {
            type:String,
            required:false
        },
        phone: {
            type: String
        },
        gender: {
            type: String
        },
        profilePhotoUrl: {
            type: String
        }
    },
    { timestamps: true })

export  const userModel:Model<IuserDocument> =mongoose.model<IuserDocument>("users1",userSchema)