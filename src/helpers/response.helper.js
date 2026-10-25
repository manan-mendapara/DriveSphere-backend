
export const sendResponse = (
  res,
  statusCode,
  success,
  message,
  data = null
) => {
  // If data is an object containing count and data properties, spread them
  // Otherwise, use data as the data property
  let responseData;
  if (data && typeof data === 'object' && 'count' in data && 'data' in data) {
    responseData = { count: data.count, data: data.data };
  } else if (data !== null) {
    responseData = { data };
  } else {
    responseData = {};
  }

  return res.status(statusCode).json({
    success,
    message,
    ...responseData,
  });
};
