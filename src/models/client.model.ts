import { Schema, model, Document } from "mongoose";

export interface IAddress {
  country: string;
  city: string;
}

export interface IClient extends Document {
  firstName: string;
  lastName: string;
  middleName: string;
  address: IAddress;
  email: string;
  phone: string;
  sellerId: Schema.Types.ObjectId;
  createdAt: Date;
}

const ClientSchema: Schema<IClient> = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  middleName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  address: {
    country: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 56,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 85,
      trim: true,
    },
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    maxlength: 100,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^\d{12}$/,
  },
  sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<IClient>("Client", ClientSchema);
