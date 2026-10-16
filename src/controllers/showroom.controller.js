
import { getNearbyShowroomsService } from "../services/showroom.service.js";

export const getNearbyShowroomsController = async (req, res, next) => {
  try {
    const latitude = Number(req.query.lat);
    const longitude = Number(req.query.lng);

    const maxDistance =
      req.query.maxDistance === undefined
        ? 10000
        : Number(req.query.maxDistance);

    // Check required query parameters
    if (
      req.query.lat === undefined ||
      req.query.lng === undefined ||
      req.query.lat.trim() === "" ||
      req.query.lng.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required.",
        data: [],
      });
    }

    const showrooms = await getNearbyShowroomsService(
      latitude,
      longitude,
      maxDistance
    );

    return res.status(200).json({
      success: true,
      message: "Nearby showrooms fetched successfully.",
      count: showrooms.length,
      data: showrooms,
    });
  } catch (error) {
    next(error);
  }
};
