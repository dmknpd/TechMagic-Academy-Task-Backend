import { Request } from "express";

import Itinerary, { IItinerary } from "../models/itinerary.models";

import { ApiResponse } from "../types/res";

export const createItinerary = async (
  req: Request,
  res: ApiResponse<IItinerary>
) => {
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

export const getAllItineraries = async (
  req: Request,
  res: ApiResponse<IItinerary[]>
) => {
  try {
    const itineraries = await Itinerary.find();

    res.status(201).json({ success: true, data: itineraries });
    return;
  } catch (error: any) {
    console.error("Error getting itineraries: ", error);
    res.status(500).json({
      success: false,
      message: `Error getting itineraries: ${error.message}`,
    });
    return;
  }
};

export const getItinerariesByCountry = async (
  req: Request,
  res: ApiResponse<IItinerary>
) => {
  const { country } = req.query;
  try {
    if (!country) {
      res.status(400).json({
        success: false,
        message: "Enter valid country",
      });
      return;
    }

    const itinerary = await Itinerary.findOne({ country });

    if (!itinerary) {
      res.status(400).json({
        success: false,
        message: "Itinerary does not exist",
      });
      return;
    }

    res.status(201).json({ success: true, data: itinerary });
    return;
  } catch (error: any) {
    console.error("Error getting itinerary: ", error);
    res.status(500).json({
      success: false,
      message: `Error getting itinerary: ${error.message}`,
    });
    return;
  }
};
