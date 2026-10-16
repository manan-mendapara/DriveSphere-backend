import { getGoogleMapsDirectionsUrl } from "../helpers/googleMap.helper.js";
import Showroom from "../models/showroom.model.js";

export const getNearbyShowroomsService = async (
  latitude,
  longitude,
  maxDistance = 10000,
) => {
  // Validate coordinates
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

  // Find nearby showrooms

  const showrooms = await Showroom.find({
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

  return showrooms.map((showroom) => ({
    ...showroom,
    directionsUrl: getGoogleMapsDirectionsUrl(
      showroom.location.coordinates[1],
      showroom.location.coordinates[0],
    ),
  }));
};
