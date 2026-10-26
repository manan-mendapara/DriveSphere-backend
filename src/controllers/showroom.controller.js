import { createShowroomService, getShowroomService, getAllShowroomsService } from "../services/showroom.service.js";
import { sendResponse } from "../helpers/response.helper.js";

export const createShowroomController = async (c, next) => {
  try {
    const showroom = await createShowroomService(c.req.json());

    return sendResponse(
      c,
      201,
      true,
      "Showroom created successfully.",
      showroom
    );
  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
};

export const getShowroomController = async (c, next) => {
  try {
    const { id } = c.req.param();
    const showroom = await getShowroomService(id);

    if (!showroom) {
      return sendResponse(
        c,
        404,
        false,
        "Showroom not found.",
      );
    }

    return sendResponse(
      c,
      200,
      true,
      "Showroom fetched successfully.",
      showroom
    );
  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
};

export const getAllShowroomsController = async (c, next) => {
  try {
    const showrooms = await getAllShowroomsService();

    return sendResponse(
      c,
      200,
      true,
      "Showrooms fetched successfully.",
      showrooms
    );
  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
};