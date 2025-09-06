import { Request } from "express";

import Itinerary, { IItinerary } from "../models/itinerary.models";
import Tour from "../models/tour.models";

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

export const updateItinerary = async (
  req: Request,
  res: ApiResponse<IItinerary>
) => {
  const { id } = req.params;
  const { country, hotel, price } = req.body;

  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Enter itinerary ID",
      });
    }

    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      id,
      { country, hotel, price },
      { new: true }
    );

    if (!updatedItinerary) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Itinerary updated successfully",
      data: updatedItinerary,
    });
  } catch (error: any) {
    console.error("Error updating itinerary: ", error);
    return res.status(500).json({
      success: false,
      message: `Error updating itinerary: ${error.message}`,
    });
  }
};

export const deleteItinerary = async (
  req: Request,
  res: ApiResponse<{ id: string }>
) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Enter itinerary ID",
      });
    }

    const linkedTours = await Tour.find({ itineraryId: id });
    if (linkedTours.length) {
      return res.status(400).json({
        success: false,
        message: `Itinerary cannot be deleted, it is used in ${linkedTours.length} tour(s)`,
      });
    }

    const deletedClient = await Itinerary.findByIdAndDelete(id);

    if (!deletedClient) {
      return res.status(404).json({
        success: false,
        message: "Itinerary not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Itinerary deleted successfully",
      data: { id },
    });
  } catch (error: any) {
    console.error("Error deleting itinerary: ", error);
    return res.status(500).json({
      success: false,
      message: `Error deleting itinerary: ${error.message}`,
    });
  }
};
