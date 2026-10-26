export const createComparisonService = async (carIds) => {
  // TODO: Replace with D1 query to create comparison
  // const comparison = await db.insertInto("comparisons").values({ car_ids: carIds }).returning("*").executeTakeFirst();

  // For now, return mock comparison - replace with actual D1 query
  return {
    id: "mock-comparison-id",
    car_ids: carIds,
    createdAt: new Date(),
  };
};

export const getComparisonService = async (comparisonId) => {
  // TODO: Replace with D1 query to get comparison by ID
  // const comparison = await db.selectFrom("comparisons").selectAll().where("id", "=", comparisonId).executeTakeFirst();

  // For now, return mock comparison - replace with actual D1 query
  return {
    id: comparisonId,
    car_ids: [],
    createdAt: new Date(),
  };
};

// get all comparisons
export const getAllComparisonsService = async () => {
  // TODO: Replace with D1 query to get all comparisons
  // const comparisons = await db.selectFrom("comparisons").selectAll().execute();

  // For now, return mock comparisons - replace with actual D1 query
  return [];
};