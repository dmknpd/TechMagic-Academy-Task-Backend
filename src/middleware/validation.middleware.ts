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
