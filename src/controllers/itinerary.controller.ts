import { Request, Response } from "express";

import Itinerary from "../models/itinerary.models";

export const createItinerary = async (req: Request, res: Response) => {
  const { country, climate, duration, hotel, price } = req.body;
  try {
    const existing = await Itinerary.findOne({
      country,
      hotel,
      duration,
    });

    if (existing) {
      res.status(400).json({
        errors: { message: "Itinerary already exist" },
      });
      return;
    }

    const itinerary = new Itinerary({
      country,
      climate,
      duration,
      hotel,
      price,
    });

    await itinerary.save();

    res.status(201).json({ message: "Itinerary created successfully" });
    return;
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating itinerary: ${error.message}` });
    return;
  }
};
