import { body, validationResult } from "express-validator";
import { Request, NextFunction } from "express";
import { ApiResponse } from "../types/res";

const validateRequest = (
  req: Request,
  res: ApiResponse,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted: Record<string, string[]> = {};

    errors.array().forEach((err) => {
      if (err.type === "field") {
        if (!formatted[err.path]) {
          formatted[err.path] = [];
        }
        formatted[err.path].push(err.msg);
      }
    });
    return res.status(400).json({
      success: false,
      errors: formatted,
    });
  }
  next();
};

export const registerValidator = [
  body("firstName")
    .notEmpty()
    .withMessage("First Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("First Name must be between 2 and 50 characters"),

  body("lastName")
    .notEmpty()
    .withMessage("Last Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last Name must be between 2 and 50 characters"),

  body("email").isEmail().withMessage("Invalid email address"),

  body("password")
    .isLength({ min: 4, max: 50 })
    .withMessage("Password must be between 4 and 50 characters"),

  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),

  validateRequest,
];

export const loginValidator = [
  body("email").isEmail().withMessage("Invalid email address"),

  validateRequest,
];

export const clientValidator = [
  body("firstName")
    .notEmpty()
    .withMessage("First Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("First Name must be between 2 and 50 characters"),

  body("lastName")
    .notEmpty()
    .withMessage("Last Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last Name must be between 2 and 50 characters"),

  body("middleName")
    .notEmpty()
    .withMessage("Middle Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Middle Name must be between 2 and 50 characters"),

  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .isLength({ max: 100 })
    .withMessage("Email must be at most 100 characters"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\d{12}$/)
    .withMessage("Phone number must be 12 digits"),

  validateRequest,
];

export const itineraryValidator = [
  body("country")
    .notEmpty()
    .withMessage("Country is required")
    .isLength({ min: 2, max: 56 })
    .withMessage("Country must be between 2 and 56 characters"),

  body("climate")
    .notEmpty()
    .withMessage("Climate is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Climate must be between 2 and 50 characters"),

  body("hotel")
    .notEmpty()
    .withMessage("Hotel is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Hotel must be between 2 and 50 characters"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 1 })
    .withMessage("Price must be greater than 0"),

  body("url")
    .notEmpty()
    .withMessage("Url is required")
    .isLength({ min: 5, max: 255 })
    .withMessage("Url must be between 5 and 255 characters")
    .isURL()
    .withMessage("Url must be valid"),

  validateRequest,
];

export const discountValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("value")
    .notEmpty()
    .withMessage("Value is required")
    .isFloat({ min: 1, max: 99 })
    .withMessage("Value must be between 1 and 99"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Description must be between 2 and 100 characters"),

  validateRequest,
];
