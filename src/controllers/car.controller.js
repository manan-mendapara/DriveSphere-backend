
import { createCarService, deleteCarService, getAllCarsService, getCarByIdService, updateCarService } from "../services/car.services.js";
import { STATUS_CODES } from "../helpers/error.helper.js";


// create car controller
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

// update controller
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

// delete car controller
export const deleteCarController = async (req, res, next) => {
  try {
    const deleteCarDetails = await deleteCarService(req.params.id);

    if (!deleteCarDetails) {
      return res.status(STATUS_CODES.NOT_FOUND.code).json({
        success: false,
        status: STATUS_CODES.NOT_FOUND.status,
        message: "Car not found.",
      });
    }

    return res.status(STATUS_CODES.OK.code).json({
      success: true,
      status: STATUS_CODES.OK.status,
      message: "car deleted successfully.",
      data: deleteCarDetails
    });
  } catch(error) { 
    next(error)
  }
}


// ================================ user car display api =========================================== //

// all cars
export const allCarsController = async (req, res, next) => {
  try {
    const allCars = await getAllCarsService();

    if (!allCars) {
      return res.status(STATUS_CODES.BAD_REQUEST.code).json({
        success: false,
        message: STATUS_CODES.BAD_REQUEST.message,
        message: "No cars Found."
      });
    }

    return res.status(STATUS_CODES.OK.code).json({
      success: true,
      status: STATUS_CODES.OK.status,
      message: STATUS_CODES.OK.message,
      message: "Cars Fetch Successfully.",
      data: allCars
    });
  } catch(error){ 
    next(error);
  }
}

// get car by id 
export const carbyIdController = async (req, res, next) => {
  try {
    const carById = await getCarByIdService(req.params.id);

    if(!carById) {
      res.status(STATUS_CODES.BAD_REQUEST.code).json({
        success: false,
        message: STATUS_CODES.BAD_REQUEST.message,
        message: "Car id not found."
      });
    }

    res.status(STATUS_CODES.OK.code).json({
      success: true,
      status: STATUS_CODES.OK.status,
      message: STATUS_CODES.OK.message,
      message: "Cars Fetch Successfully.",
      data: carById
    });
  } catch(error) {
    next(error);
  }
}