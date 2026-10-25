
import {
  createComparisonService,
  getComparisonService,
  deleteComparisonService,
} from "../services/comparison.service.js";

import { sendResponse } from "../helpers/response.helper.js";

const getUserId = (req) => req.user?.id ?? req.user?._id;

export const createComparisonController = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const { cars } = req.body;

    if (!userId) {
      return sendResponse(res, 401, false, "Please log in.");
    }

    const comparison = await createComparisonService(userId, cars);

    return sendResponse(
      res,
      201,
      true,
      "Comparison created successfully.",
      comparison
    );
  } catch (error) {
    next(error);
  }
};

export const getComparisonController = async (req, res, next) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendResponse(res, 401, false, "Please log in.");
    }

    const comparison = await getComparisonService(userId);

    return sendResponse(
      res,
      200,
      true,
      "Comparison fetched successfully.",
      comparison
    );
  } catch (error) {
    next(error);
  }
};

export const deleteComparisonController = async (req, res, next) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendResponse(res, 401, false, "Please log in.");
    }

    await deleteComparisonService(userId);

    return sendResponse(
      res,
      200,
      true,
      "Comparison deleted successfully."
    );
  } catch (error) {
    next(error);
  }
};