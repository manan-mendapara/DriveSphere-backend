import { createServiceCenterService, getServiceCenterService, getAllServiceCentersService } from "../services/serviceCenter.service.js";
import { sendResponse } from "../helpers/response.helper.js";

export const createServiceCenterController = async (c, next) => {
  try {
    const serviceCenter = await createServiceCenterService(c.req.json());

    return sendResponse(
      c,
      201,
      true,
      "Service center created successfully.",
      serviceCenter
    );
  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
};

export const getServiceCenterController = async (c, next) => {
  try {
    const { id } = c.req.param();
    const serviceCenter = await getServiceCenterService(id);

    if (!serviceCenter) {
      return sendResponse(
        c,
        404,
        false,
        "Service center not found.",
      );
    }

    return sendResponse(
      c,
      200,
      true,
      "Service center fetched successfully.",
      serviceCenter
    );
  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
};

export const getAllServiceCentersController = async (c, next) => {
  try {
    const serviceCenters = await getAllServiceCentersService();

    return sendResponse(
      c,
      200,
      true,
      "Service centers fetched successfully.",
      serviceCenters
    );
  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
};