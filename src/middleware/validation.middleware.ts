import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
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
    return res.status(400).json({ errors: formatted });
  }
  next();
};

export const registerValidator = [
  body("firstName")
    .notEmpty()
    .withMessage("First Name is required")
    .isLength({ min: 2 })
    .withMessage("First Name must be at least 2 characters"),

  body("lastName")
    .notEmpty()
    .withMessage("Last Name is required")
    .isLength({ min: 2 })
    .withMessage("Last Name must be at least 2 characters"),

  body("email").isEmail().withMessage("Invalid email address"),

  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters"),

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
    .isLength({ min: 2 })
    .withMessage("First Name must be at least 2 characters"),

  body("lastName")
    .notEmpty()
    .withMessage("Last Name is required")
    .isLength({ min: 2 })
    .withMessage("Last Name must be at least 2 characters"),

  body("middleName")
    .notEmpty()
    .withMessage("Middle Name is required")
    .isLength({ min: 2 })
    .withMessage("Middle Name must be at least 2 characters"),

  body("email").isEmail().withMessage("Invalid email address"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\d{12}$/)
    .withMessage("Phone number must be 10-15 digits"),

  validateRequest,
];

export const itineraryValidator = [
  body("country").notEmpty().withMessage("Country is required"),
  body("climate").notEmpty().withMessage("Climate is required"),
  body("hotel").notEmpty().withMessage("Hotel is required"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),
  body("url")
    .notEmpty()
    .withMessage("Url is required")
    .isURL()
    .withMessage("Url must be valid"),
  validateRequest,
];
