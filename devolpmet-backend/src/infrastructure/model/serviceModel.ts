import mongoose  from "mongoose";
import { Schema,Document } from "mongoose";
import { Model } from "mongoose";

export  interface  IserviceDocument extends Document{
    service:string;
    subCategory:string[]
}

const serviceSchema: Schema = new Schema<IserviceDocument>({
    service:{
        type:String,
        required:true
    },
    subCategory:{
        type:[String],
        required:false
    }
});
export const serviceModel :Model<IserviceDocument>=mongoose.model<IserviceDocument>("service",serviceSchema)