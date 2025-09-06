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
      return res.status(400).json({
        success: false,
        message: "Itinerary already exist",
      });
    }

    const itinerary = new Itinerary({
      country,
      climate,
      hotel,
      price,
      url,
    });

    await itinerary.save();

    return res.status(201).json({
      success: true,
      message: "Itinerary created successfully",
      data: itinerary,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `Error creating itinerary: ${error.message}`,
    });
  }
};

export const getAllItineraries = async (
  req: Request,
  res: ApiResponse<IItinerary[]>
) => {
  try {
    const itineraries = await Itinerary.find();

    return res.status(201).json({ success: true, data: itineraries });
  } catch (error: any) {
    console.error("Error getting itineraries: ", error);
    return res.status(500).json({
      success: false,
      message: `Error getting itineraries: ${error.message}`,
    });
  }
};

export const getItinerariesById = async (
  req: Request,
  res: ApiResponse<IItinerary>
) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Enter itinerary ID",
      });
    }

    const itinerary = await Itinerary.findOne({ _id: id });

    if (!itinerary) {
      return res.status(400).json({
        success: false,
        message: "Itinerary does not exist",
      });
    }

    return res.status(201).json({ success: true, data: itinerary });
  } catch (error: any) {
    console.error("Error getting itinerary: ", error);
    return res.status(500).json({
      success: false,
      message: `Error getting itinerary: ${error.message}`,
    });
  }
};
