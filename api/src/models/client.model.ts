import mongoose, { Schema } from "mongoose";
import { IClient } from "../shared/types/client.types";

const clientSchema = new Schema<IClient>({
    name : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    phone : {
        type: Number,
        required: true,
    },
    company : {
        type: String,
        default: "",
    },
}, {timestamps: true,})

export const Client = mongoose.model<IClient>("Client", clientSchema);