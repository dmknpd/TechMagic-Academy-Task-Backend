import { Request, Response } from "express";

import Itinerary from "../models/itinerary.models";

import { ApiResponse } from "../types/res";

export const createItinerary = async (req: Request, res: ApiResponse) => {
  const { country, climate, duration, hotel, price } = req.body;
  try {
    const existing = await Itinerary.findOne({
      country,
      hotel,
      duration,
    });

    if (existing) {
      res.status(400).json({
        success: false,
        message: "Itinerary already exist",
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

    res
      .status(201)
      .json({ success: true, message: "Itinerary created successfully" });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Error creating itinerary: ${error.message}`,
    });
    return;
  }
};
