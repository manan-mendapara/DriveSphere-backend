
export const getGoogleMapsDirectionsUrl = (latitude, longitude) => {
  const lat = Number(latitude);
  const lng = Number(longitude);

  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lng) ||
    lat < -90 ||
    lat > 90 ||
    lng < -180 ||
    lng > 180
  ) {
    throw new Error("Invalid destination coordinates.");
  }

  const params = new URLSearchParams({
    api: "1",
    destination: `${lat},${lng}`,
  });

  return `https://www.google.com/maps/dir/?${params.toString()}`;
};
