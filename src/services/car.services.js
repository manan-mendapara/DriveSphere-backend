
import Car from "../models/car.model.js";

export const createCarService = async (carData) => {
  const car = await Car.create(carData);

  return car;
};


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