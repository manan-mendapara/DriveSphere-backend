
import {
  addToWishlistService,
  getWishlistService,
  removeFromWishlistService,
} from "../services/wishlist.service.js";

import { sendResponse } from "../helpers/response.helper.js";

const getUserId = (req) => req.user?.id ?? req.user?._id;

// Add a car to wishlist
export const addToWishlistController = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const { carId } = req.params;

    if (!userId) {
      return sendResponse(res, 401, false, "Please log in.");
    }

    const wishlist = await addToWishlistService(userId, carId);

    return sendResponse(
      res,
      200,
      true,
      "Car added to wishlist successfully.",
      wishlist
    );
  } catch (error) {
    next(error);
  }
};


// Get user's wishlist
export const getWishlistController = async (req, res, next) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendResponse(res, 401, false, "Please log in.");
    }

    const wishlist = await getWishlistService(userId);

    return sendResponse(
      res,
      200,
      true,
      "Wishlist fetched successfully.",
      wishlist
    );
  } catch (error) {
    next(error);
  }
};


// Remove a car from wishlist
export const removeFromWishlistController = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const { carId } = req.params;

    if (!userId) {
      return sendResponse(res, 401, false, "Please log in.");
    }

    const wishlist = await removeFromWishlistService(userId, carId);

    return sendResponse(
      res,
      200,
      true,
      "Car removed from wishlist successfully.",
      wishlist
    );
  } catch (error) {
    next(error);
  }
};
