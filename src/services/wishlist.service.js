import mongoose from "mongoose";
import Wishlist from "../models/wishlist.model.js";
import Car from "../models/car.model.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// Add a car to the wishlist
export const addToWishlistService = async (userId, carId) => {
    if (!mongoose.isValidObjectId(userId)) {
        throw createError("Invalid user ID.", 400);
    }

    if (!mongoose.isValidObjectId(carId)) {
        throw createError("Invalid car ID.", 400);
    }

    const carExists = await Car.exists({ _id: carId });

    if (!carExists) {
        throw createError("Car not found.", 404);
    }

    const wishlist = await Wishlist.findOneAndUpdate(
        { userId },
        { $addToSet: { cars: carId } },
        {
        returnDocument: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
        },
    ).populate("cars");

    return wishlist;
};

// Get all wishlist cars
export const getWishlistService = async (userId) => {
    if (!mongoose.isValidObjectId(userId)) {
        throw createError("Invalid user ID.", 400);
    }

    const wishlist = await Wishlist.findOne({ userId }).populate("cars").lean();

    if (!wishlist) {
        return {
        userId,
        cars: [],
        };
    }

    return wishlist;
};

// Remove a car from the wishlist
export const removeFromWishlistService = async (userId, carId) => {
    if (!mongoose.isValidObjectId(userId)) {
        throw createError("Invalid user ID.", 400);
    }

    if (!mongoose.isValidObjectId(carId)) {
        throw createError("Invalid car ID.", 400);
    }

    const wishlist = await Wishlist.findOneAndUpdate(
        { userId },
        { $pull: { cars: carId } },
        { returnDocument: true, runValidators: true },
    ).populate("cars");

    if (!wishlist) {
        throw createError("Wishlist not found.", 404);
    }

    return wishlist;
};
