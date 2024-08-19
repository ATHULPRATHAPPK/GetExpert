import { Document,Schema } from "mongoose";
import mongoose from "mongoose";

export interface AdminDocument extends Document{
    email:string,
    password: string
}

const adminSchema: Schema = new Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps:true})

export const AdminModel = mongoose.model<AdminDocument>('admin',adminSchema)