import { Schema, model, Document } from "mongoose";

export interface IDiscount extends Document {
  name: string;
  value: number;
  description: string;
  createdAt: Date;
}

const DiscountSchema: Schema<IDiscount> = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  value: {
    type: Number,
    required: true,
    min: 1,
    max: 99,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<IDiscount>("Discount", DiscountSchema);
