
import { STATUS_CODES } from "../helpers/error.helper.js";

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({
      success: false,
      status: STATUS_CODES.BAD_REQUEST.status,
      message:
        err.name === "ValidationError"
          ? "Car validation failed."
          : "Invalid field value.",
      errors:
        err.name === "ValidationError"
          ? Object.values(err.errors).map((item) => ({
              field: item.path,
              message: item.message,
            }))
          : undefined,
    });
  }

  console.error(err);

  return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
    .json({
      success: false,
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR.status,
      message: HTTP_STATUS.INTERNAL_SERVER_ERROR.message,
    });
};
