import { Schema, model, Document } from "mongoose";

export interface IAddress {
  country: string;
  city: string;
  street: string;
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
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String, required: true },
  address: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
  },
  email: { type: String, unique: true, lowercase: true },
  phone: { type: String, required: true, unique: true },
  sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<IClient>("Client", ClientSchema);
