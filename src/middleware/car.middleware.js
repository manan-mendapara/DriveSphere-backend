
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

  const missingFields = requiredFields.filter(
    (field) =>
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
