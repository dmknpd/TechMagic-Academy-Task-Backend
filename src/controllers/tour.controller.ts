import { Request, Response } from "express";

import Tour from "../models/tour.models";
import Itinerary from "../models/itinerary.models";
import Client from "../models/client.model";

import { ApiResponse } from "../types/res";

export const createTour = async (req: Request, res: ApiResponse) => {
  const { itineraryId, clientId, startDate, quantity, discount } = req.body;

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
      startDate: new Date(startDate),
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
      startDate: new Date(startDate),
      quantity,
      discount,
    });

    await tour.save();

    res.status(201).json({
      success: true,
      message: "Tour created successfully",
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
