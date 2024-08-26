import { timeStamp } from "console";
import mongoose  from "mongoose";
import { Schema,Document } from "mongoose";
import { Model } from "mongoose";
import { string } from "zod";


export interface ITechDocument extends Document{
    email: string,
    userName: string,
    password: string,
    createdAt: Date,
    updateAt: Date,
    blocked:boolean,
    verified:boolean
}

const techSchema:Schema = new Schema<ITechDocument>({
    email:{
        type:String,
        required:true,
        unique:true
    },
    userName:{
        type: String,        
        required: true,
    },
    password:{
        type: String,
        default:null
    },
    blocked:{
        type:Boolean
    },
    verified:{
        type:Boolean,
        default: false
    }
},{timestamps:true})

export  const techModel:Model<ITechDocument> =mongoose.model<ITechDocument>("Technician",techSchema)