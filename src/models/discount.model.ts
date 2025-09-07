import { Schema, model, Document } from "mongoose";

export interface IDiscount extends Document {
  name: string;
  value: number;
  description: string;
  createdAt: Date;
}

const DiscountSchema: Schema<IDiscount> = new Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true, min: 1 },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<IDiscount>("Discount", DiscountSchema);
