import mongoose from "mongoose";
// car creation middleware
export const validateCarRequest = (req, res, next) => {

    if (
        !req.body ||
        typeof req.body !== "object" ||
        Array.isArray(req.body)
    ) {
        return res.status(400).json({
            success: false,
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
        return res.status(400).json({
            success: false,
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
        return res.status(400).json({
            success: false,
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
        return res.status(400).json({
            success: false,
            message: "Provide at least one field to update.",
        });
    }

    const invalidFields = Object.keys(body).filter((field) => 
        !allowedFields.includes(field)
    );

    if (invalidFields.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Unknown or non-editable fields provided.",
            invalidFields,
        });
    }

    next();
};
