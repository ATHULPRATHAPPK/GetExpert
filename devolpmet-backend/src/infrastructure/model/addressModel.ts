import { UserAddress } from "../../domain/entities/userAddress";
import mongoose, { Schema, Document, Model } from "mongoose";

// Define the address sub-schema for individual addresses
const addressSchema: Schema = new Schema<UserAddress>({
  buildingNumber: { type: String, required: false }, // Optional field
  city: { type: String, required: false },            // Required field (can adjust to your needs)
  pincode: { type: String, required: false },         // Required field (can adjust to your needs)
  state: { type: String, required: false }            // Required field (can adjust to your needs)
});

// Define the main address document schema
export interface IaddressDocument extends Document {
  roleId: string;
  role: string;
  address: UserAddress[];  
}

// Main schema that stores the user role and their addresses


// Main Address Schema
const addressSchemaMain: Schema = new Schema<IaddressDocument>({
  roleId: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  address: [addressSchema]  // Embedding the address subdocument schema
});

export const addressModel: Model<IaddressDocument> = mongoose.model<IaddressDocument>("Address", addressSchemaMain);

