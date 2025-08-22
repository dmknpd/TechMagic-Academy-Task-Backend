import { Schema, model, Document } from "mongoose";

interface ITour extends Document {
  itineraryId: Schema.Types.ObjectId;
  clientId: Schema.Types.ObjectId;
  startDate: Date;
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
  quantity: { type: Number, required: true },
  discount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model("Tour", TourSchema);
