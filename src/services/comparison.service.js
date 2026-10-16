
import mongoose from "mongoose";
import Comparison from "../models/comparison.model.js";
import Car from "../models/car.model.js";


const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};


// create comparision
export const createComparisonService = async (userId, cars) => {
  if (!mongoose.isValidObjectId(userId)) {
    throw createError("Invalid user ID.", 400);
  }

  if (!Array.isArray(cars) || cars.length !== 2) {
    throw createError("You must select exactly 2 cars.", 400);
  }

  if (!cars.every((id) => mongoose.isValidObjectId(id))) {
    throw createError("Invalid car ID provided.", 400);
  }

  const [firstCar, secondCar] = cars.map((id) => id.toString());

  if (firstCar === secondCar) {
    throw createError("Please select 2 different cars.", 400);
  }

  const existingCars = await Car.find({
    _id: { $in: cars },
  }).select("_id");

  if (existingCars.length !== 2) {
    throw createError("One or both cars were not found.", 404);
  }

  let comparison = await Comparison.findOne({ userId });

  if (comparison) {
    comparison.cars = cars;
    await comparison.save();
  } else {
    comparison = await Comparison.create({
      userId,
      cars,
    });
  }

  return await Comparison.findById(comparison._id)
    .populate("cars")
    .lean();
};


// see comparision
export const getComparisonService = async (userId) => {
  if (!mongoose.isValidObjectId(userId)) {
    throw createError("Invalid user ID.", 400);
  }

  const comparison = await Comparison.findOne({ userId })
    .populate("cars")
    .lean();

  if (!comparison) {
    throw createError("Comparison not found.", 404);
  }

  return comparison;
};


// delete comparision
export const deleteComparisonService = async (userId) => {
  if (!mongoose.isValidObjectId(userId)) {
    throw createError("Invalid user ID.", 400);
  }

  const comparison = await Comparison.findOneAndDelete({ userId });

  if (!comparison) {
    throw createError("Comparison not found.", 404);
  }

  return comparison;
};
