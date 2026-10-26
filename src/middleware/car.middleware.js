export const isValidObjectId = (id) => {
  // Cloudflare Workers compatible ObjectId validation
  // MongoDB ObjectId is a 24-character hex string
  return typeof id === "string" && id.length === 24 && /^[0-9a-fA-F]+$/.test(id);
};

export const validateCarRequest = (c, next) => {
  const body = c.req.json();

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return c.json({
      success: false,
      message: "Request body must be a JSON object.",
    }, 400);
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
      !Object.prototype.hasOwnProperty.call(body, field) ||
      body[field] === null ||
      body[field] === undefined,
  );

  if (missingFields.length > 0) {
    return c.json({
      success: false,
      message: "Required fields are missing.",
      missingFields,
    }, 400);
  }

  next();
};

// car creation middleware
export const validateCarUpdate = (c, next) => {
  const body = c.req.json();

  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body) ||
    Object.keys(body).length === 0
  ) {
    return c.json({
      success: false,
      message: "Provide at least one field to update.",
    }, 400);
  }

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

  const invalidFields = Object.keys(body).filter(
    (field) => !allowedFields.includes(field),
  );

  if (invalidFields.length > 0) {
    return c.json({
      success: false,
      message: "Unknown or non-editable fields provided.",
      invalidFields,
    }, 400);
  }

  next();
};

// delete car
export const validateCarDelete = (c, next) => {
  const id = c.req.param("id");

  if (!isValidObjectId(id)) {
    return c.json({
      success: false,
      message: "car Id not found",
    }, 404);
  }

  next();
};

// get car by id
export const validateCarId = (c, next) => {
  const id = c.req.param("id");

  if (!isValidObjectId(id)) {
    return c.json({
      success: false,
      message: "car Id not found",
    }, 404);
  }

  next();
};