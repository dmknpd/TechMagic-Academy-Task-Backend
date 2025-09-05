import Client, { IClient } from "../models/client.model";
import Tour from "../models/tour.models";

import { RequestWithUserId } from "../types/req";
import { ApiResponse } from "../types/res";

export const createClient = async (
  req: RequestWithUserId,
  res: ApiResponse<IClient>
) => {
  const { firstName, lastName, middleName, email, phone, address } = req.body;
  const sellerId = req.userId;

  try {
    const existing = await Client.findOne({ phone });

    if (existing) {
      res.status(400).json({
        success: false,
        errors: { phone: ["Phone number already used"] },
      });
      return;
    }

    const client = new Client({
      firstName,
      lastName,
      middleName,
      email,
      phone,
      address,
      sellerId,
    });

    await client.save();

    res.status(201).json({
      success: true,
      message: "Client created successfully",
      data: client,
    });
    return;
  } catch (error: any) {
    console.error("Error creating client: ", error);
    res.status(500).json({
      success: false,
      message: `Error creating client: ${error.message}`,
    });
    return;
  }
};

export const getAllClients = async (
  req: RequestWithUserId,
  res: ApiResponse<IClient[]>
) => {
  try {
    const clients = await Client.find();

    res.status(201).json({ success: true, data: clients });
    return;
  } catch (error: any) {
    console.error("Error getting clients: ", error);
    res.status(500).json({
      success: false,
      message: `Error getting clients: ${error.message}`,
    });
    return;
  }
};

export const getClient = async (
  req: RequestWithUserId,
  res: ApiResponse<IClient>
) => {
  const { phone, _id } = req.query;
  try {
    if (!phone && !_id) {
      res.status(400).json({
        success: false,
        message: "Enter phone number or client ID",
      });
      return;
    }

    const filter: Record<string, any> = {};
    if (phone) {
      filter.phone = phone;
    }
    if (_id) {
      filter._id = _id;
    }

    const client = await Client.findOne(filter);

    if (!client) {
      res.status(400).json({
        success: false,
        message: "Client does not exist",
      });
      return;
    }

    res.status(201).json({ success: true, data: client });
    return;
  } catch (error: any) {
    console.error("Error getting client: ", error);
    res.status(500).json({
      success: false,
      message: `Error getting client: ${error.message}`,
    });
    return;
  }
};

export const getClientFullInfo = async (
  req: RequestWithUserId,
  res: ApiResponse
) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Enter client ID",
      });
    }

    const client = await Client.findOne({ _id: id })
      .populate({
        path: "sellerId",
        select: "firstName lastName",
      })
      .lean();

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client does not exist",
      });
    }

    const tours = await Tour.find({ clientId: client._id })
      .populate({ path: "itineraryId", select: "country hotel price" })
      .lean();

    return res.status(200).json({
      success: true,
      data: {
        ...client,
        tours,
      },
    });
  } catch (error: any) {
    console.error("Error getting client: ", error);
    return res.status(500).json({
      success: false,
      message: `Error getting client: ${error.message}`,
    });
  }
};
