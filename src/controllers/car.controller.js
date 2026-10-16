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
export const createCarController = async (req, res, next) => {
  try {
    const createdCar = await createCarService(req.body);

    return sendResponse(
      res,
      201,
      true,
      "Car created successfully.",
      createdCar,
    );

  } catch (error) {
    next(error);
  }
};

// update controller
export const updateCarController = async (req, res, next) => {
  try {
    const updatedCar = await updateCarService(
      req.params.id,
      req.body
    );

    if (!updatedCar) {
      return sendResponse(
        res,
        404,
        false,
        "Car not found.",
      );
    }

    return sendResponse(
      res,
      201,
      true,
      "Car updated successfully.",
      updatedCar,
    );
  } catch (error) {
    next(error);
  }
};

// delete car controller
export const deleteCarController = async (req, res, next) => {
  try {
    const deleteCarDetails = await deleteCarService(req.params.id);

    if (!deleteCarDetails) {
      return sendResponse(
        res,
        404,
        false,
        "Car not found.",
      );
    }

    return sendResponse(
      res,
      201,
      true,
      "car deleted successfully.",
      deleteCarDetails
    );
  } catch(error) { 
    next(error)
  }
}

// ================================ user car display api =========================================== //

// all cars
export const allCarsController = async (req, res, next) => {
  try {
    const allCars = await getAllCarsService();

    if (!allCars) {
      return sendResponse(
        res,
        404,
        false,
        "Car not found.",
      );
    }

    return sendResponse(
      res,
      200,
      true,
      "Cars Fetch Successfully.",
      allCars
    );
  } catch(error){ 
    next(error);
  }
}

// get car by id 
export const carbyIdController = async (req, res, next) => {
  try {
    const carById = await getCarByIdService(req.params.id);

    if(!carById) {
      return sendResponse(
        res,
        400,
        false,
        "Car not found.",
      );
    }

    return sendResponse(
      res,
      200,
      true,
      "Cars Fetch Successfully.",
      carById
    );
  } catch(error) {
    next(error);
  }
}

export const searchCarsController = async (req, res, next) => {
  try {
    const result = await searchCarsServices(req.query);

    return sendResponse(
      res,
      200,
      true,
      "Cars fetched successfully",
      ...result,
    );

  } catch (error) {
    next(error);
  }
};

export const brandSearchController = async (req, res, next) => {
  try {
    const { brand } = req.params;
    const carBrand = await searchByBrandService(brand);

    if(!carBrand) {
      return sendResponse(
        res,
        404,
        false,
        "Car Brand not found.",
      );
    }

    return sendResponse(
      res,
      200,
      true,
      "car brand fetch successfully.",
      carBrand
    );

  } catch(error) {
    next(error);
  }
}

export const categorySearchController = async (req, res, next) => {
  try {
    const { category } = req.params;
    const carCategory = await searchByCategoryService(category);

    if(!carCategory || carCategory.length === 0) {
      return sendResponse(
        res,
        404,
        false,
        "Car Category not found.",
        [],
      );
    }

    return sendResponse(
      res,
      200,
      true,
      "car category fetch successfully.",
      carCategory
    );
  } catch(error) {
    next(error);
  }
}

// bodytype search
export const bodyTypeSearchController = async (req, res, next) => {
  try {
    const { bodyType } = req.params;

    const cars = await searchByBodyTypeService(bodyType);

    if (cars.length === 0) {
      return sendResponse(
        res,
        404,
        false,
        "Car BodyType not found.",
        []
      );
    }

    return sendResponse(
      res,
      200,
      true,
      "Cars fetched successfully by body type",
      cars.length,
      cars,
    );
  } catch (error) {
    next(error);
  }
};

// brand list 
export const brandListController = async (req, res, next) => {
  try {
    const brands = await carBrandListService();

    return sendResponse(
      res,
      200,
      true,
      "car brand list fetch successfully.",
      brands.length,
      brands,
    );
  } catch(error) {
    next(error);
  }
}

// category list
export const categoryListController = async (req, res, next) => {
  try {
    const categories = await carCategoryListService();

    return sendResponse(
      res,
      200,
      true,
      "car category list fetch successfully.",
      categories.length,
      categories,
    );
  } catch(error) {
    next(error);
  }
}

// bodytype lis
export const bodyTypeListController = async (req, res, next) => {
  try {
    const bodyType = await carBodytypeListService();

    return sendResponse(
      res,
      200,
      true,
      "car bodyType list fetch successfully.",
      bodyType.length,
      bodyType,
    );
  } catch(error) {
    next(error);
  }
}