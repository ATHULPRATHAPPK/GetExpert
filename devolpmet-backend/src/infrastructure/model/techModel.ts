import mongoose, { Schema, Document, Model } from "mongoose";
import { boolean } from "zod";

export interface ITechDocument extends Document {
    email: string;
    userName: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    blocked: boolean;
    verified: boolean;
    address: {
        place: string;
        city: string;
    };
    preferredWorkPlace: {
        pincode: string;
        block: string;
        district: string;
    };
    professionInfo: {
        profession: string;
        subcategories: string[];
    };
    documents: {
        professionalLicenseUrl: string | null;
        idProofUrl: string | null;
        certificate1Url: string | null;
        certificate2Url: string | null;
    };
    profilePhotoUrl: string | null;
    documentSubmited:boolean | null
}

const techSchema: Schema = new Schema<ITechDocument>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        default: null,
    },
    blocked: {
        type: Boolean,
        default: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    address: {
        place: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
    },
    preferredWorkPlace: {
        pincode: {
            type: String,
            required: false,
        },
        block: {
            type: String,
            required: false,
        },
        district: {
            type: String,
            required: false,
        },
    },
    professionInfo: {
        profession: {
            type: String,
            required: false,
        },
        subcategories: {
            type: [String],
            required: false,
        },
    },
    documents: {
        professionalLicenseUrl: {
            type: String,
            default: null,
        },
        idProofUrl: {
            type: String,
            default: null,
        },
        certificate1Url: {
            type: String,
            default: null,
        },
        certificate2Url: {
            type: String,
            default: null,
        },
    },
    profilePhotoUrl: {
        type: String,
        default: null,
    },
    documentSubmited:{
        type: Boolean,
        default: null,
    },

}, { timestamps: true });

export const techModel: Model<ITechDocument> = mongoose.model<ITechDocument>("Technician", techSchema);
