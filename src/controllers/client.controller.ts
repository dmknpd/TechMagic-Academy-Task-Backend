import { Response } from "express";

import Client from "../models/client.model";

import { RequestWithUserId } from "../types/req";

export const createClient = async (req: RequestWithUserId, res: Response) => {
  const { firstName, lastName, middleName, email, phone } = req.body;
  const sellerId = req.userId;

  try {
    const existing = await Client.findOne({ email });

    if (existing) {
      res.status(400).json({
        errors: { email: ["Email already used"] },
      });
      return;
    }

    const client = new Client({
      firstName,
      lastName,
      middleName,
      email,
      phone,
      sellerId,
    });

    await client.save();

    res.status(201).json({ message: "Client created successfully" });
    return;
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating client: ${error.message}` });
    return;
  }
};
