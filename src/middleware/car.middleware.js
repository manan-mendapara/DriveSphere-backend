import mongoose from "mongoose";
import { STATUS_CODES } from "../helpers/error.helper.js";

// car creation middleware
export const validateCarRequest = (req, res, next) => {

    if (
        !req.body ||
        typeof req.body !== "object" ||
        Array.isArray(req.body)
    ) {
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

    const missingFields = requiredFields.filter((field) =>
        !Object.prototype.hasOwnProperty.call(req.body, field) ||
        req.body[field] === null ||
        req.body[field] === undefined
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
];      //fields allow for update


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

    const invalidFields = Object.keys(body).filter((field) => 
        !allowedFields.includes(field)
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
    
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(STATUS_CODES.NOT_FOUND.code).json({
            success: false,
            message: STATUS_CODES.NOT_FOUND.message,
            message: "car Id not found"
        });
    }
    next();
}

// get car by id
export const validateCarId = (req, res, next) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(STATUS_CODES.NOT_FOUND.code).json({
            success: false,
            message: STATUS_CODES.NOT_FOUND.message,
            message: "car Id not found"
        });
    }
    next();
}
