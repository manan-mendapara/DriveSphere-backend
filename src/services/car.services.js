
import Car from "../models/car.model.js";
import {
  buildCarFilter,
  buildCarPagination,
  buildCarSort,
} from "../helpers/carSearch.helper.js";

// =================================== admin side operations ================================== //

// create cars
export const createCarService = async (carData) => {
  const car = await Car.create(carData);

  return car;
};

// update cars
export const updateCarService = async (carId, updateData) => {
  const updatedCar = await Car.findByIdAndUpdate(
    carId,
    { $set: updateData },
    {
      returnDocument: "after",
      runValidators: true,
      strict: "throw",
    }
  );

  return updatedCar;
};

// delete cars
export const deleteCarService = async (carId) => {
  const deleteCar = await Car.findByIdAndDelete(
    carId,
  )
  return deleteCar;
}


// ======================================== user side operation ==================================== //

// get all cars
export const getAllCarsService = async () => {
  const allCars = await Car.find();

  return allCars;
}


// find by id service
export const getCarByIdService = async (carId) => {
  const carById = await Car.findById(carId);

  return carById;
}

// car search quey
export const searchCarsServices = async (query) => {
  const filter = buildCarFilter(query);
  const { page, limit, skip } = buildCarPagination(query);
  const sort = buildCarSort(query);

  const [cars, total] = await Promise.all([
    Car.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),

    Car.countDocuments(filter),
  ]);

  return {
    cars,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// car search by brand
import { escapeRegex } from "../helpers/regex.helper.js";
export const searchByBrandService = async (brand) => {
  const carByBrand = await Car.find({
    brand: {
      $regex: `^${escapeRegex(brand.trim())}$`,
      $options: "i", 
    }
  }).lean();

  return carByBrand;
}
