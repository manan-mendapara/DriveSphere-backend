import { escapeRegex } from "../helpers/regex.helper.js";

// =================================== admin side operations ================================== //

// create cars
export const createCarService = async (carData) => {
  // TODO: Replace with D1 query to insert car
  // const { db } = c.env; // or receive db as parameter
  // const result = await db.prepare(
  //   "INSERT INTO cars (brand, model, variant, year, bodyType, category, price, specification, safety, images, isFeatured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  // ).bind(...values).run();

  // For now, return mock car data - replace with actual D1 insert
  return {
    id: "mock-car-id",
    ...carData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

// update cars
export const updateCarService = async (carId, updateData) => {
  // TODO: Replace with D1 query to update car
  // const result = await db
  //   .update("cars")
  //   .set(updateData)
  //   .where("id", "=", carId)
  //   .returning("*")
  //   .execute();

  // For now, return mock updated car - replace with actual D1 update
  return {
    id: carId,
    ...updateData,
    updatedAt: new Date(),
  };
};

// delete cars
export const deleteCarService = async (carId) => {
  // TODO: Replace with D1 query to delete car
  // const result = await db
  //   .delete("cars")
  //   .where("id", "=", carId)
  //   .execute();

  // For now, return mock deleted car - replace with actual D1 delete
  return {
    id: carId,
    deleted: true,
  };
};

// ======================================== user side operation ==================================== //

// get all cars
export const getAllCarsService = async () => {
  // TODO: Replace with D1 query to get all cars
  // const cars = await db.selectFrom("cars").selectAll().execute();

  // For now, return mock cars - replace with actual D1 query
  return [
    {
      id: "mock-1",
      brand: "Toyota",
      model: "Camry",
      year: 2020,
      bodyType: "Sedan",
      category: "Mid-Range",
      price: 25000,
      specification: {
        fuelType: "Petrol",
        transmission: "Automatic",
        horsepower: 200,
        torque: 180,
        seatingCapacity: 5,
      },
      images: { thumbnail: "https://example.com/car1.jpg", gallery: [] },
      isFeatured: false,
    },
  ];
};

// find by id service
export const getCarByIdService = async (carId) => {
  // TODO: Replace with D1 query to get car by ID
  // const car = await db.selectFrom("cars").selectAll().where("id", "=", carId).executeTakeFirst();

  // For now, return mock car - replace with actual D1 query
  return {
    id: carId,
    brand: "Toyota",
    model: "Camry",
    year: 2020,
    bodyType: "Sedan",
    category: "Mid-Range",
    price: 25000,
    specification: {
      fuelType: "Petrol",
      transmission: "Automatic",
      horsepower: 200,
      torque: 180,
      seatingCapacity: 5,
    },
    images: { thumbnail: "https://example.com/car1.jpg", gallery: [] },
    isFeatured: false,
  };
};

// car brand list
export const carBrandListService = async () => {
  // TODO: Replace with D1 query to get distinct brands
  // const brands = await db.selectFrom("cars").select("brand").distinct().execute();

  // For now, return mock brands - replace with actual D1 query
  return ["Toyota", "Honda", "Ford", "BMW", " Mercedes-Benz"];
};

// car category list
export const carCategoryListService = async () => {
  // TODO: Replace with D1 query to get distinct categories
  // const categories = await db.selectFrom("cars").select("category").distinct().execute();

  // For now, return mock categories - replace with actual D1 query
  return ["Sedan", "SUV", "Hatchback", "Coupe", "Convertible"];
};

// car boytype list
export const carBodytypeListService = async () => {
  // TODO: Replace with D1 query to get distinct body types
  // const bodyTypes = await db.selectFrom("cars").select("bodyType").distinct().execute();

  // For now, return mock body types - replace with actual D1 query
  return ["Sedan", "SUV", "Hatchback"];
};

// car search query
export const searchCarsServices = async (query) => {
  // TODO: Replace with D1 query with filtering, pagination, and sorting
  // const filter = buildCarFilter(query);
  // const { page, limit, skip } = buildCarPagination(query);
  // const sort = buildCarSort(query);
  // const cars = await db.selectFrom("cars").selectAll().where(filter).orderBy(sort).skip(skip).limit(limit).execute();
  // const total = await db.selectFrom("cars").selectAll().where(filter).executeTakeFirstOrThrow().count;

  // For now, return mock data - replace with actual D1 query
  return {
    cars: [],
    pagination: {
      total: 0,
      page: query.page ?? 1,
      limit: query.limit ?? 10,
      totalPages: 0,
    },
  };
};

// car search by brand
export const searchByBrandService = async (brand) => {
  // TODO: Replace with D1 query with brand filter
  // const cars = await db.selectFrom("cars").selectAll().where("brand", "=", brand).execute();

  // For now, return mock data - replace with actual D1 query
  return [];
};

// search category type
export const searchByCategoryService = async (category) => {
  // TODO: Replace with D1 query with category filter
  // const cars = await db.selectFrom("cars").selectAll().where("category", "=", category).execute();

  // For now, return mock data - replace with actual D1 query
  return [];
};

// search bodytype
export const searchByBodyTypeService = async (bodyType) => {
  // TODO: Replace with D1 query with bodyType filter
  // const cars = await db.selectFrom("cars").selectAll().where("bodyType", "=", bodyType).execute();

  // For now, return mock data - replace with actual D1 query
  return [];
};