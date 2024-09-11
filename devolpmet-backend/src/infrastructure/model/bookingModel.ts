import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for the Booking Document
export interface IBookingDocument extends Document {
    category: string;
    service: string;
    date: string;
    time: string;
    address: {
        buildingNumber: string;
        city: string;
        pincode: string;
        state: string;
    };
    userEmail: string;
    userId: mongoose.Schema.Types.ObjectId;
    technicianId: mongoose.Schema.Types.ObjectId;
    status: string;
}

// Define the schema for the Booking model
const bookingSchema: Schema = new Schema<IBookingDocument>({
    category: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    address: {
        buildingNumber: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        pincode: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
    },
    userEmail: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User", // Reference to User Model
    },
    technicianId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Technician", // Reference to Technician Model
    },
    status: {
        type: String,
        default: "pending", // Set default status to "pending"
    }
}, { timestamps: true });

// Create and export the Booking model
export const BookingModel: Model<IBookingDocument> = mongoose.model<IBookingDocument>("Booking", bookingSchema);
