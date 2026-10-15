
import Car from "../models/car.model.js";
import {
  buildCarFilter,
  buildCarPagination,
  buildCarSort,
} from "../helpers/carSearch.helper.js";
import { escapeRegex } from "../helpers/regex.helper.js";

// =================================== admin side operations ================================== //

// create cars
export const createCarService = async (carData) => {
  const car = await Car.create(carData);

  return car;
};

// update cars
export const updateCarService = async (carId, updateData) => {
  const updatedCar = await Car.findByIdAndUpdate(
    carId,
    { $set: updateData },
    {
      returnDocument: "after",
      runValidators: true,
      strict: "throw",
    }
  );

  return updatedCar;
};

// delete cars
export const deleteCarService = async (carId) => {
  const deleteCar = await Car.findByIdAndDelete(
    carId,
  )
  return deleteCar;
}


// ======================================== user side operation ==================================== //

// get all cars
export const getAllCarsService = async () => {
  const allCars = await Car.find();

  return allCars;
}


// find by id service
export const getCarByIdService = async (carId) => {
  const carById = await Car.findById(carId);

  return carById;
}

// car search quey
export const searchCarsServices = async (query) => {
  const filter = buildCarFilter(query);
  const { page, limit, skip } = buildCarPagination(query);
  const sort = buildCarSort(query);

  const [cars, total] = await Promise.all([
    Car.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),

    Car.countDocuments(filter),
  ]);

  return {
    cars,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// car search by brand
export const searchByBrandService = async (brand) => {
  const carByBrand = await Car.find({
    brand: {
      $regex: `^${escapeRegex(brand.trim())}$`,
      $options: "i", 
    }
  }).lean();

  return carByBrand;
}

// search category type
export const searchByCategoryService = async (category) => {
  const escapedCategory = escapeRegex(category.trim());

  return await Car.find({
    category: {
      $regex: `^${escapedCategory}$`,
      $options: "i",
    },
  });
};

// search bodytype
export const searchByBodyTypeService = async (bodyType) => {
  const escapedBodyType = escapeRegex(bodyType.trim());

  return await Car.find({
    bodyType: {
      $regex: `^${escapedBodyType}$`,
      $options: "i",
    },
  });
};

// car brand list 
export const carBrandListService = async (brand) => {
  const brandList = await Car.distinct("brand");

  return brandList
    .filter(Boolean)
    .sort((a, b) => {
      a.localeCompare(b)
    });
}

// car category list
export const carCategoryListService = async (category) => {
  const categoryList = await Car.distinct("category");

  return categoryList
  .filter(Boolean)
  .sort((a,b) => {
    a.localeCompare(b)
  });
}

// car boytype list
export const carBodytypeListService = async (bodytype) => {
  const bodyTypeList = await Car.distinct("bodyType");

  return bodyTypeList
  .filter(Boolean)
  .sort((a,b) => {
    a.localeCompare(b)
  });
}