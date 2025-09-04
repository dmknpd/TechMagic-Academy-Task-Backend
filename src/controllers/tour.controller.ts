import { Request, Response } from "express";

import Tour, { ITour } from "../models/tour.models";
import Itinerary from "../models/itinerary.models";
import Client from "../models/client.model";

import { ApiResponse } from "../types/res";

export const createTour = async (req: Request, res: ApiResponse<ITour>) => {
  const { itineraryId, clientId, startDate, quantity, duration, discount } =
    req.body;

  try {
    const itinerary = await Itinerary.findById(itineraryId);

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: "Itinerary not found",
      });
    }

    const client = await Client.findById(clientId);
    if (!client) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }

    const existing = await Tour.findOne({
      itineraryId,
      clientId,
      startDate,
    });

    if (existing) {
      res.status(400).json({
        success: false,
        message: "Tour already exist",
      });
      return;
    }

    const tour = new Tour({
      itineraryId,
      clientId,
      startDate,
      duration,
      quantity,
      discount,
    });

    await tour.save();

    res.status(201).json({
      success: true,
      message: "Tour created successfully",
      data: tour,
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Error creating tour: ${error.message}`,
    });
    return;
  }
};

export const getAllTours = async (req: Request, res: ApiResponse<ITour[]>) => {
  try {
    const tours = await Tour.find();

    res.status(201).json({ success: true, data: tours });
    return;
  } catch (error: any) {
    console.error("Error getting tours: ", error);
    res.status(500).json({
      success: false,
      message: `Error getting tours: ${error.message}`,
    });
    return;
  }
};
