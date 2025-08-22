import { Schema, model, Document, Types } from "mongoose";

interface IItinerary extends Document {
  country: string;
  climate: string;
  duration: number;
  hotel: string;
  price: number;
  createdAt: Date;
}

const ItinerarySchema = new Schema<IItinerary>({
  country: { type: String, required: true },
  climate: { type: String, required: true },
  hotel: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model("Itinerary", ItinerarySchema);
