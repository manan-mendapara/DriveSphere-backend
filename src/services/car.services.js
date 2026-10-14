
import Car from "../models/car.model.js";

export const createCarService = async (carData) => {
  const car = await Car.create(carData);

  return car;
};
