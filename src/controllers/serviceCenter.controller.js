
import {
  getNearbyServiceCentersService,
} from "../services/serviceCenter.service.js";

export const getNearbyServiceCentersController = async (
  req,
  res,
  next
) => {
  try {
    const { lat, lng, maxDistance } = req.query;

    // Validate required query parameters
    if (
      lat === undefined ||
      lng === undefined ||
      lat.trim() === "" ||
      lng.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required.",
        data: [],
      });
    }

    const latitude = Number(lat);
    const longitude = Number(lng);

    const distance =
      maxDistance === undefined ? 10000 : Number(maxDistance);

    const serviceCenters = await getNearbyServiceCentersService(
      latitude,
      longitude,
      distance
    );

    return res.status(200).json({
      success: true,
      message: "Nearby service centers fetched successfully.",
      count: serviceCenters.length,
      data: serviceCenters,
    });
  } catch (error) {
    next(error);
  }
};
