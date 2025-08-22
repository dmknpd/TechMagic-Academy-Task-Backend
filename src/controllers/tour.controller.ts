import { Request, Response } from "express";

import Tour from "../models/tour.models";
import Itinerary from "../models/itinerary.models";
import Client from "../models/client.model";

export const createTour = async (req: Request, res: Response) => {
  const { itineraryId, clientId, startDate, quantity, discount } = req.body;

  try {
    const itinerary = await Itinerary.findById(itineraryId);

    if (!itinerary) {
      return res
        .status(404)
        .json({ errors: { message: "Itinerary not found" } });
    }

    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ errors: { message: "Client not found" } });
    }

    const existing = await Tour.findOne({
      itineraryId,
      clientId,
      startDate: new Date(startDate),
    });

    if (existing) {
      res.status(400).json({
        errors: { message: ["Tour already exist"] },
      });
      return;
    }

    const tour = new Tour({
      itineraryId,
      clientId,
      startDate: new Date(startDate),
      quantity,
      discount,
    });

    await tour.save();

    res.status(201).json({ message: "Tour created successfully" });
    return;
  } catch (error: any) {
    res.status(500).json({ message: `Error creating tour: ${error.message}` });
    return;
  }
};
