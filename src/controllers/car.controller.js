import {
  carBodytypeListService,
  carBrandListService,
  carCategoryListService,
  createCarService,
  deleteCarService,
  getAllCarsService,
  getCarByIdService,
  searchByBrandService,
  searchByCategoryService,
  searchByBodyTypeService,
  searchCarsServices,
  updateCarService,
} from "../services/car.service.js";
import { sendResponse } from "../helpers/response.helper.js";

// create car controller
export const createCarController = async (c, next) => {
  try {
    const createdCar = await createCarService(c.req.json());

    return sendResponse(
      c,
      201,
      true,
      "Car created successfully.",
      createdCar,
    );
  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
};

// update controller
export const updateCarController = async (c, next) => {
  try {
    const { id } = c.req.param();
    const updatedCar = await updateCarService(
      id,
      c.req.json()
    );

    if (!updatedCar) {
      return sendResponse(
        c,
        404,
        false,
        "Car not found.",
      );
    }

    return sendResponse(
      c,
      200,
      true,
      "Car updated successfully.",
      updatedCar,
    );
  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
};

// delete car controller
export const deleteCarController = async (c, next) => {
  try {
    const { id } = c.req.param();
    const deleteCarDetails = await deleteCarService(id);

    if (!deleteCarDetails) {
      return sendResponse(
        c,
        404,
        false,
        "Car not found.",
      );
    }

    return sendResponse(
      c,
      200,
      true,
      "Car deleted successfully.",
      deleteCarDetails
    );
  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
};

// ================================ user car display api =========================================== //

// all cars
export const allCarsController = async (c, next) => {
  try {
    const allCars = await getAllCarsService();

    if (!allCars || allCars.length === 0) {
      return sendResponse(
        c,
        404,
        false,
        "Car not found.",
      );
    }

    return sendResponse(
      c,
      200,
      true,
      "Cars fetched successfully.",
      allCars
    );
  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
}

// get car by id
export const carbyIdController = async (c, next) => {
  try {
    const { id } = c.req.param();
    const carById = await getCarByIdService(id);

    if (!carById) {
      return sendResponse(
        c,
        404,
        false,
        "Car not found.",
      );
    }

    return sendResponse(
      c,
      200,
      true,
      "Car fetched successfully.",
      carById
    );
  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
}

export const searchCarsController = async (c, next) => {
  try {
    const result = await searchCarsServices(c.req.query());
    // return res.status(200).json("done");
    return sendResponse(
      c,
      200,
      true,
      "Cars fetched successfully",
      result,
    );

  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
};

export const brandSearchController = async (c, next) => {
  try {
    const { brand } = c.req.param();
    const carBrand = await searchByBrandService(brand);

    if (!carBrand) {
      return sendResponse(
        c,
        404,
        false,
        "Car Brand not found.",
      );
    }

    return sendResponse(
      c,
      200,
      true,
      "Car brand fetched successfully.",
      carBrand
    );

  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
}

export const categorySearchController = async (c, next) => {
  try {
    const { category } = c.req.param();
    const carCategory = await searchByCategoryService(category);

    if (!carCategory || carCategory.length === 0) {
      return sendResponse(
        c,
        404,
        false,
        "Car Category not found.",
        [],
      );
    }

    return sendResponse(
      c,
      200,
      true,
      "Car category fetched successfully.",
      carCategory
    );

  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
}

// bodytype search
export const bodyTypeSearchController = async (c, next) => {
  try {
    const { bodyType } = c.req.param();
    const cars = await searchByBodyTypeService(bodyType);

    if (cars.length === 0) {
      return sendResponse(
        c,
        404,
        false,
        "Car BodyType not found.",
        []
      );
    }

    return sendResponse(
      c,
      200,
      true,
      "Cars fetched successfully by body type",
      { count: cars.length, data: cars },
    );

  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
};

// brand list
export const brandListController = async (c, next) => {
  try {
    const brands = await carBrandListService();

    return sendResponse(
      c,
      200,
      true,
      "Car brand list fetched successfully.",
      { count: brands.length, data: brands }
    );

  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
}

// category list
export const categoryListController = async (c, next) => {
  try {
    const categories = await carCategoryListService();

    return sendResponse(
      c,
      200,
      true,
      "Car category list fetched successfully.",
      { count: categories.length, data: categories }
    );

  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
}

// bodytype lis
export const bodyTypeListController = async (c, next) => {
  try {
    const bodyType = await carBodytypeListService();

    return sendResponse(
      c,
      200,
      true,
      "Car bodyType list fetched successfully.",
      { count: bodyType.length, data: bodyType }
    );

  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 500);
  }
};