
const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const parseBoolean = (value) => {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
};

export const buildCarFilter = (query) => {
  const filter = {};

  const {
    search,
    brand,
    model,
    variant,
    category,
    bodyType,
    fuelType,
    transmission,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
    seatingCapacity,
    isFeatured,
    sunroof,
  } = query;

  // Search across brand, model and variant
  if (search?.trim()) {
    const keyword = new RegExp(
      escapeRegex(search.trim()),
      "i"
    );

    filter.$or = [
      { brand: keyword },
      { model: keyword },
      { variant: keyword },
    ];
  }

  // Exact-match filters
  if (brand) filter.brand = brand;
  if (model) filter.model = model;
  if (variant) filter.variant = variant;
  if (category) filter.category = category;
  if (bodyType) filter.bodyType = bodyType;

  // Nested specification filters
  if (fuelType) {
    filter["specification.fuelType"] = fuelType;
  }

  if (transmission) {
    filter["specification.transmission"] = transmission;
  }

  if (seatingCapacity !== undefined) {
    filter["specification.seatingCapacity"] =
      Number(seatingCapacity);
  }

  // Price range
  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};

    if (minPrice !== undefined) {
      filter.price.$gte = Number(minPrice);
    }

    if (maxPrice !== undefined) {
      filter.price.$lte = Number(maxPrice);
    }
  }

  // Year range
  if (minYear !== undefined || maxYear !== undefined) {
    filter.year = {};

    if (minYear !== undefined) {
      filter.year.$gte = Number(minYear);
    }

    if (maxYear !== undefined) {
      filter.year.$lte = Number(maxYear);
    }
  }

  const featured = parseBoolean(isFeatured);

  if (featured !== undefined) {
    filter.isFeatured = featured;
  }

  const hasSunroof = parseBoolean(sunroof);

  if (hasSunroof !== undefined) {
    filter["features.sunroof"] = hasSunroof;
  }

  return filter;
};

export const buildCarPagination = (query) => {
  const page = Number(query.page ?? 1);
  const limit = Number(query.limit ?? 10);

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
};

export const buildCarSort = (query) => {
  const allowedFields = [
    "price",
    "year",
    "brand",
    "createdAt",
  ];

  const sortBy = allowedFields.includes(query.sortBy)
    ? query.sortBy
    : "createdAt";

  const order = query.order === "asc" ? 1 : -1;

  return { [sortBy]: order };
};
