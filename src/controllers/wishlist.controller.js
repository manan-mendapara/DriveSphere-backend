import { createWishlistService, getWishlistService, getAllWishlistService } from "../services/wishlist.service.js";
import { sendResponse } from "../helpers/response.helper.js";

export const createWishlistController = async (c, next) => {
  try {
    const wishlist = await createWishlistService(c.req.json());

    return sendResponse(
      c,
      201,
      true,
      "Wishlist item created successfully.",
      wishlist
    );
  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
};

export const getWishlistController = async (c, next) => {
  try {
    const { id } = c.req.param();
    const wishlist = await getWishlistService(id);

    if (!wishlist) {
      return sendResponse(
        c,
        404,
        false,
        "Wishlist item not found.",
      );
    }

    return sendResponse(
      c,
      200,
      true,
      "Wishlist item fetched successfully.",
      wishlist
    );
  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
};

export const getAllWishlistController = async (c, next) => {
  try {
    const wishlistItems = await getAllWishlistService();

    return sendResponse(
      c,
      200,
      true,
      "Wishlist items fetched successfully.",
      wishlistItems
    );
  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
};