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
  country: { type: String, required: true },
  climate: { type: String, required: true },
  hotel: { type: String, required: true },
  duration: { type: [Number], default: [1, 2, 4] },
  price: { type: Number, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model("Itinerary", ItinerarySchema);
