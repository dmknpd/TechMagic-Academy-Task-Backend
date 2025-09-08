import { Schema, model, Document, Types } from "mongoose";

export interface IItinerary extends Document {
  country: string;
  climate: string;
  duration: number[];
  hotel: string;
  price: number;
  url: string;
  createdAt: Date;
}

const ItinerarySchema = new Schema<IItinerary>({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 56,
    trim: true,
  },
  climate: {
    type: String,
    required: true,
    lowercase: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  hotel: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  duration: {
    type: [Number],
    default: [1, 2, 4],
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  url: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Itinerary", ItinerarySchema);
