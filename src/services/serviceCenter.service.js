export const createServiceCenterService = async (serviceCenterData) => {
  // TODO: Replace with D1 query to create service center
  // const result = await db.insertInto("service_centers").values(serviceCenterData).returning("*").executeTakeFirst();

  // For now, return mock service center - replace with actual D1 query
  return {
    id: "mock-service-center-id",
    ...serviceCenterData,
    createdAt: new Date(),
  };
};

export const getServiceCenterService = async (serviceCenterId) => {
  // TODO: Replace with D1 query to get service center by ID
  // const result = await db.selectFrom("service_centers").selectAll().where("id", "=", serviceCenterId).executeTakeFirst();

  // For now, return mock service center - replace with actual D1 query
  return {
    id: serviceCenterId,
    ...serviceCenterData,
    createdAt: new Date(),
  };
};

// get all service centers
export const getAllServiceCentersService = async () => {
  // TODO: Replace with D1 query to get all service centers
  // const results = await db.selectFrom("service_centers").selectAll().execute();

  // For now, return mock service centers - replace with actual D1 query
  return [];
};