
import { createCarService } from "../services/car.services.js";
import { STATUS_CODES } from "../helpers/error.helper.js";

export const createCarController = async (req, res, next) => {
  try {
    const createdCar = await createCarService(req.body);

    return res
      .status(STATUS_CODES.CREATED.code)
      .json({
        success: true,
        status: STATUS_CODES.CREATED.status,
        message: "Car created successfully.",
        data: createdCar,
      });
  } catch (error) {
    next(error);
  }
};
