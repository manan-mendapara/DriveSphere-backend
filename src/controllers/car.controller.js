
import { createCarService, updateCarService } from "../services/car.services.js";
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



export const updateCarController = async (req, res, next) => {
  try {
    const updatedCar = await updateCarService(
      req.params.id,
      req.body
    );

    if (!updatedCar) {
      return res.status(STATUS_CODES.NOT_FOUND.code).json({
        success: false,
        status: STATUS_CODES.NOT_FOUND.status,
        message: "Car not found.",
      });
    }

    return res.status(STATUS_CODES.OK.code).json({
      success: true,
      status: STATUS_CODES.OK.status,
      message: "Car updated successfully.",
      data: updatedCar,
    });
  } catch (error) {
    next(error);
  }
};
