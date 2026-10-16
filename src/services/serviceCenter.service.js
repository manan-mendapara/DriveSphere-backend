
import ServiceCenter from "../models/serviceCenter.model.js";

export const getNearbyServiceCentersService = async (
  latitude,
  longitude,
  maxDistance = 10000
) => {
  // Validate latitude and longitude
  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    const error = new Error("Invalid latitude or longitude.");
    error.statusCode = 400;
    throw error;
  }

  // Validate search distance
  if (
    !Number.isFinite(maxDistance) ||
    maxDistance <= 0 ||
    maxDistance > 100000
  ) {
    const error = new Error("Invalid search distance.");
    error.statusCode = 400;
    throw error;
  }

  const serviceCenters = await ServiceCenter.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: maxDistance,
      },
    },
  })
    .limit(20)
    .lean();

  return serviceCenters;
};
