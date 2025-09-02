import { Request, Response } from "express";

import Itinerary from "../models/itinerary.models";

import { ApiResponse } from "../types/res";

export const createItinerary = async (req: Request, res: ApiResponse) => {
  const { country, climate, hotel, price, url } = req.body;
  try {
    const existing = await Itinerary.findOne({
      country,
      hotel,
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
      hotel,
      price,
      url,
    });

    await itinerary.save();

    res.status(201).json({
      success: true,
      message: "Itinerary created successfully",
      data: itinerary,
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Error creating itinerary: ${error.message}`,
    });
    return;
  }
};
