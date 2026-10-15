
import Car from "../models/car.model.js";

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