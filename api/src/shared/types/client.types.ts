import { Types } from "mongoose";

export interface IClient {
    _id ?: Types.ObjectId;
    name : string;
    email : string;
    phone : number;
    company ?: string;
    createdAt ?: Date;
    updatedAt ?: Date;
}