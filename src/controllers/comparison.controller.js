import { createComparisonService, getComparisonService, getAllComparisonsService } from "../services/comparison.service.js";
import { sendResponse } from "../helpers/response.helper.js";

export const createComparisonController = async (c, next) => {
  try {
    const { carIds } = c.req.json();
    const comparison = await createComparisonService(carIds);

    return sendResponse(
      c,
      201,
      true,
      "Comparison created successfully.",
      comparison
    );
  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
};

export const getComparisonController = async (c, next) => {
  try {
    const { id } = c.req.param();
    const comparison = await getComparisonService(id);

    if (!comparison) {
      return sendResponse(
        c,
        404,
        false,
        "Comparison not found.",
      );
    }

    return sendResponse(
      c,
      200,
      true,
      "Comparison fetched successfully.",
      comparison
    );
  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
};

export const getAllComparisonsController = async (c, next) => {
  try {
    const comparisons = await getAllComparisonsService();

    return sendResponse(
      c,
      200,
      true,
      "Comparisons fetched successfully.",
      comparisons
    );
  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
};