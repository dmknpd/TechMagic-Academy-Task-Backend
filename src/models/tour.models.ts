import { Schema, model, Document } from "mongoose";

export interface ITour extends Document {
  itineraryId: Schema.Types.ObjectId;
  clientId: Schema.Types.ObjectId;
  startDate: Date;
  duration: number;
  quantity: number;
  discount: number;
  createdAt: Date;
}

const TourSchema = new Schema<ITour>({
  itineraryId: {
    type: Schema.Types.ObjectId,
    ref: "Itinerary",
    required: true,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  startDate: { type: Date, required: true },
  duration: {
    type: Number,
    required: true,
    min: 1,
    max: 4,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
  discount: {
    type: Number,
    default: 0,
    min: 1,
    max: 99,
  },
  createdAt: { type: Date, default: Date.now },
});

export default model("Tour", TourSchema);
