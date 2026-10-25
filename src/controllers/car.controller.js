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
export const createCarController = async (_req, res, next) => {
  try {
    const createdCar = await createCarService(_req.body);

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
export const updateCarController = async (_req, res, next) => {
  try {
    const updatedCar = await updateCarService(
      _req.params.id,
      _req.body
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
      200,
      true,
      "Car updated successfully.",
      updatedCar,
    );
  } catch (error) {
    next(error);
  }
};

// delete car controller
export const deleteCarController = async (_req, res, next) => {
  try {
    const deleteCarDetails = await deleteCarService(_req.params.id);

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
      200,
      true,
      "Car deleted successfully.",
      deleteCarDetails
    );
  } catch (error) {
    next(error);
  }
};

// ================================ user car display api =========================================== //

// all cars
export const allCarsController = async (_req, res, next) => {
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
      "Cars fetched successfully.",
      allCars
    );
  } catch (error) {
    next(error);
  }
}

// get car by id 
export const carbyIdController = async (_req, res, next) => {
  try {
    const carById = await getCarByIdService(_req.params.id);

    if(!carById) {
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
      "Car fetched successfully.",
      carById
    );
  } catch(error) {
    next(error);
  }
}

export const searchCarsController = async (_req, res, next) => {
  try {
    console.log("search car called.", _req.query);
    const result = await searchCarsServices(_req.query);
    // return res.status(200).json("done");
    return sendResponse(
      res,
      200,
      true,
      "Cars fetched successfully",
      result,
    );

  } catch (error) {
    next(error);
  }
};

export const brandSearchController = async (_req, res, next) => {
  try {
    const { brand } = _req.params;
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
      "Car brand fetched successfully.",
      carBrand
    );

  } catch(error) {
    next(error);
  }
}

export const categorySearchController = async (_req, res, next) => {
  try {
    const { category } = _req.params;
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
      "Car category fetched successfully.",
      carCategory
    );
  } catch(error) {
    next(error);
  }
}

// bodytype search
export const bodyTypeSearchController = async (_req, res, next) => {
  try {
    const { bodyType } = _req.params;

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
      { count: cars.length, data: cars },
    );
  } catch (error) {
    next(error);
  }
};

// brand list 
export const brandListController = async (_req, res, next) => {
  try {
    const brands = await carBrandListService();

    return sendResponse(
      res,
      200,
      true,
      "Car brand list fetched successfully.",
      { count: brands.length, data: brands }
    );
  } catch(error) {
    next(error);
  }
}

// category list
export const categoryListController = async (_req, res, next) => {
  try {
    const categories = await carCategoryListService();

    return sendResponse(
      res,
      200,
      true,
      "Car category list fetched successfully.",
      { count: categories.length, data: categories }
    );
  } catch(error) {
    next(error);
  }
}

// bodytype lis
export const bodyTypeListController = async (_req, res, next) => {
  try {
    const bodyType = await carBodytypeListService();

    return sendResponse(
      res,
      200,
      true,
      "Car bodyType list fetched successfully.",
      { count: bodyType.length, data: bodyType }
    );
  } catch(error) {
    next(error);
  }
}