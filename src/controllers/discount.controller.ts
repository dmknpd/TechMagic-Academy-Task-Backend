import Discount, { IDiscount } from "../models/discount.model";

import { RequestWithUserId } from "../types/req";
import { ApiResponse } from "../types/res";

export const createDiscount = async (
  req: RequestWithUserId,
  res: ApiResponse<IDiscount>
) => {
  const { name, value, description } = req.body;

  try {
    const existing = await Discount.findOne({ name });

    if (existing) {
      return res.status(400).json({
        success: false,
        errors: { name: ["Discount already used"] },
      });
    }

    const discount = new Discount({
      name,
      value,
      description,
    });

    await discount.save();

    return res.status(201).json({
      success: true,
      message: "Discount created successfully",
      data: discount,
    });
  } catch (error: any) {
    console.error("Error creating discount: ", error);
    return res.status(500).json({
      success: false,
      message: `Error creating discount: ${error.message}`,
    });
  }
};

export const getAllDiscounts = async (
  req: RequestWithUserId,
  res: ApiResponse<IDiscount[]>
) => {
  try {
    const discounts = await Discount.find();

    return res.status(201).json({ success: true, data: discounts });
  } catch (error: any) {
    console.error("Error getting discounts: ", error);
    return res.status(500).json({
      success: false,
      message: `Error getting discounts: ${error.message}`,
    });
  }
};

export const updateDiscount = async (
  req: RequestWithUserId,
  res: ApiResponse<IDiscount>
) => {
  const { id } = req.params;
  const { name, value, description } = req.body;

  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Enter discount ID",
      });
    }

    const existing = await Discount.findOne({ name });

    if (existing) {
      return res.status(400).json({
        success: false,
        errors: { name: ["Discount already used"] },
      });
    }

    const updatedDiscount = await Discount.findByIdAndUpdate(
      id,
      { name, value, description },
      { new: true }
    );

    if (!updatedDiscount) {
      return res.status(404).json({
        success: false,
        message: "Discount not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Discount updated successfully",
      data: updatedDiscount,
    });
  } catch (error: any) {
    console.error("Error updating discount: ", error);
    return res.status(500).json({
      success: false,
      message: `Error updating discount: ${error.message}`,
    });
  }
};

export const deleteDiscount = async (
  req: RequestWithUserId,
  res: ApiResponse<{ id: string }>
) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Enter discount ID",
      });
    }

    const deletedDiscount = await Discount.findByIdAndDelete(id);

    if (!deletedDiscount) {
      return res.status(404).json({
        success: false,
        message: "Discount not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Discount deleted successfully",
      data: { id },
    });
  } catch (error: any) {
    console.error("Error deleting discount: ", error);
    return res.status(500).json({
      success: false,
      message: `Error deleting discount: ${error.message}`,
    });
  }
};
