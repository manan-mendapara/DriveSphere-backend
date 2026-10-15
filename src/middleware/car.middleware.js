import mongoose from "mongoose";
import { STATUS_CODES } from "../helpers/error.helper.js";

// car creation middleware
export const validateCarRequest = (req, res, next) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(STATUS_CODES.BAD_REQUEST.code).json({
      success: false,
      message: STATUS_CODES.BAD_REQUEST.message,
      message: "Request body must be a JSON object.",
    });
  }

  const requiredFields = [
    "brand",
    "model",
    "variant",
    "year",
    "bodyType",
    "category",
    "price",
    "specification",
    "safety",
    "images",
  ];

  const missingFields = requiredFields.filter(
    (field) =>
      !Object.prototype.hasOwnProperty.call(req.body, field) ||
      req.body[field] === null ||
      req.body[field] === undefined,
  );

  if (missingFields.length > 0) {
    return res.status(STATUS_CODES.BAD_REQUEST.code).json({
      success: false,
      message: STATUS_CODES.BAD_REQUEST.message,
      message: "Required fields are missing.",
      missingFields,
    });
  }

  next();
};

// car creation middleware
const allowedFields = [
  "brand",
  "model",
  "variant",
  "year",
  "bodyType",
  "category",
  "price",
  "specification",
  "features",
  "safety",
  "images",
  "isFeatured",
]; //fields allow for update

export const validateCarUpdate = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(STATUS_CODES.BAD_REQUEST.code).json({
      success: false,
      message: STATUS_CODES.BAD_REQUEST.message,
      message: "Invalid car ID.",
    });
  }

  const body = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body) ||
    Object.keys(body).length === 0
  ) {
    return res.status(STATUS_CODES.BAD_REQUEST.code).json({
      success: false,
      message: STATUS_CODES.BAD_REQUEST.message,
      message: "Provide at least one field to update.",
    });
  }

  const invalidFields = Object.keys(body).filter(
    (field) => !allowedFields.includes(field),
  );

  if (invalidFields.length > 0) {
    return res.status(STATUS_CODES.BAD_REQUEST.code).json({
      success: false,
      message: STATUS_CODES.BAD_REQUEST.message,
      message: "Unknown or non-editable fields provided.",
      invalidFields,
    });
  }

  next();
};

// delete car
export const validateCarDelete = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(STATUS_CODES.NOT_FOUND.code).json({
      success: false,
      message: STATUS_CODES.NOT_FOUND.message,
      message: "car Id not found",
    });
  }
  next();
};


// get car by id
export const validateCarId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(STATUS_CODES.NOT_FOUND.code).json({
      success: false,
      message: STATUS_CODES.NOT_FOUND.message,
      message: "car Id not found",
    });
  }
  next();
};


// car search validator
export const validateCarSearch = (req, res, next) => {

  const q = req.query;

  const numericFields = [
    "minPrice",
    "maxPrice",
    "minYear",
    "maxYear",
    "seatingCapacity",
    "page",
    "limit",
  ];

  for (const field of numericFields) {
    if (q[field] === undefined) {
        continue;
    }

    const value = q[field];

    if (
      typeof value !== "string" ||
      value.trim() === "" ||
      !Number.isFinite(Number(value))
    ) {
      return res.status(400).json({
        success: false,
        message: `${field} must be a valid number`,
      });
    }
  }

  for (const field of ["minPrice", "maxPrice"]) {
    if (q[field] !== undefined && Number(q[field]) < 0) {
      return res.status(400).json({
        success: false,
        message: `${field} cannot be negative`,
      });
    }
  }

  for (const field of ["minYear", "maxYear"]) {
    if (q[field] !== undefined && !Number.isInteger(Number(q[field]))) {
      return res.status(400).json({
        success: false,
        message: `${field} must be a whole number`,
      });
    }
  }

  const page = Number(q.page ?? 1);
  const limit = Number(q.limit ?? 10);

  if (!Number.isInteger(page) || page < 1) {
    return res.status(400).json({
      success: false,
      message: "page must be a positive integer",
    });
  }

  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    return res.status(400).json({
      success: false,
      message: "limit must be between 1 and 100",
    });
  }

  if (
    q.minPrice !== undefined &&
    q.maxPrice !== undefined &&
    Number(q.minPrice) > Number(q.maxPrice)
  ) {
    return res.status(400).json({
      success: false,
      message: "minPrice cannot exceed maxPrice",
    });
  }

  if (
    q.minYear !== undefined &&
    q.maxYear !== undefined &&
    Number(q.minYear) > Number(q.maxYear)
  ) {
    return res.status(400).json({
      success: false,
      message: "minYear cannot exceed maxYear",
    });
  }

  for (const field of ["isFeatured", "sunroof"]) {
    if (q[field] !== undefined && !["true", "false"].includes(q[field])) {
      return res.status(400).json({
        success: false,
        message: `${field} must be true or false`,
      });
    }
  }

  if (q.order !== undefined && !["asc", "desc"].includes(q.order)) {
    return res.status(400).json({
      success: false,
      message: "order must be asc or desc",
    });
  }

  next();
};


// brand search
export const validateBrand = async (req, res, next) => {
    const brand = req.params.brand;

    if(mongoose)
    if(!brand) {
        res.status(STATUS_CODES.BAD_REQUEST.code).json({
            success: false,
            message: STATUS_CODES.BAD_REQUEST.message,
            message: "car brand is not available",
        });
    }
    next();
}