export const createShowroomService = async (showroomData) => {
  // TODO: Replace with D1 query to create showroom
  // const result = await db.insertInto("showrooms").values(showroomData).returning("*").executeTakeFirst();

  // For now, return mock showroom - replace with actual D1 query
  return {
    id: "mock-showroom-id",
    ...showroomData,
    createdAt: new Date(),
  };
};

export const getShowroomService = async (showroomId) => {
  // TODO: Replace with D1 query to get showroom by ID
  // const result = await db.selectFrom("showrooms").selectAll().where("id", "=", showroomId).executeTakeFirst();

  // For now, return mock showroom - replace with actual D1 query
  return {
    id: showroomId,
    ...showroomData,
    createdAt: new Date(),
  };
};

// get all showrooms
export const getAllShowroomsService = async () => {
  // TODO: Replace with D1 query to get all showrooms
  // const results = await db.selectFrom("showrooms").selectAll().execute();

  // For now, return mock showrooms - replace with actual D1 query
  return [];
};