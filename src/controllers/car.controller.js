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
} from "../services/car.services.js";
import { STATUS_CODES } from "../helpers/error.helper.js";


// create car controller
export const createCarController = async (req, res, next) => {
  try {
    const createdCar = await createCarService(req.body);

    return res
      .status(STATUS_CODES.CREATED.code)
      .json({
        success: true,
        status: STATUS_CODES.CREATED.status,
        message: "Car created successfully.",
        data: createdCar,
      });
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
      return res.status(STATUS_CODES.NOT_FOUND.code).json({
        success: false,
        status: STATUS_CODES.NOT_FOUND.status,
        message: "Car not found.",
      });
    }

    return res.status(STATUS_CODES.OK.code).json({
      success: true,
      status: STATUS_CODES.OK.status,
      message: "Car updated successfully.",
      data: updatedCar,
    });
  } catch (error) {
    next(error);
  }
};

// delete car controller
export const deleteCarController = async (req, res, next) => {
  try {
    const deleteCarDetails = await deleteCarService(req.params.id);

    if (!deleteCarDetails) {
      return res.status(STATUS_CODES.NOT_FOUND.code).json({
        success: false,
        status: STATUS_CODES.NOT_FOUND.status,
        message: "Car not found.",
      });
    }

    return res.status(STATUS_CODES.OK.code).json({
      success: true,
      status: STATUS_CODES.OK.status,
      message: "car deleted successfully.",
      data: deleteCarDetails
    });
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
      return res.status(STATUS_CODES.BAD_REQUEST.code).json({
        success: false,
        message: STATUS_CODES.BAD_REQUEST.message,
        message: "No cars Found."
      });
    }

    return res.status(STATUS_CODES.OK.code).json({
      success: true,
      status: STATUS_CODES.OK.status,
      message: STATUS_CODES.OK.message,
      message: "Cars Fetch Successfully.",
      data: allCars
    });
  } catch(error){ 
    next(error);
  }
}

// get car by id 
export const carbyIdController = async (req, res, next) => {
  try {
    const carById = await getCarByIdService(req.params.id);

    if(!carById) {
      res.status(STATUS_CODES.BAD_REQUEST.code).json({
        success: false,
        message: STATUS_CODES.BAD_REQUEST.message,
        message: "Car id not found."
      });
    }

    res.status(STATUS_CODES.OK.code).json({
      success: true,
      status: STATUS_CODES.OK.status,
      message: STATUS_CODES.OK.message,
      message: "Cars Fetch Successfully.",
      data: carById
    });
  } catch(error) {
    next(error);
  }
}

export const searchCarsController = async (req, res, next) => {
  try {
    const result = await searchCarsServices(req.query);

    return res.status(STATUS_CODES.OK.code).json({
      success: true,
      message: STATUS_CODES.OK.message,
      message: "Cars fetched successfully",
      ...result,
    });

  } catch (error) {
    next(error);
  }
};

export const brandSearchController = async (req, res, next) => {
  try {
    const { brand } = req.params;
    const carBrand = await searchByBrandService(brand);

    if(!carBrand) {
      return res.status(STATUS_CODES.BAD_REQUEST.code).json({
        success: false,
        message: STATUS_CODES.BAD_REQUEST.message,
        message: "brand not found",
        status: STATUS_CODES.BAD_REQUEST.code
      });
    }

    res.status(STATUS_CODES.OK.code).json({
      success: true,
      message: STATUS_CODES.OK.message,
      message: "car brand fetch successfully.",
      status: STATUS_CODES.OK.code,
      data: carBrand
    });

  } catch(error) {
    next(error);
  }
}

export const categorySearchController = async (req, res, next) => {
  try {
    const { category } = req.params;
    const carCategory = await searchByCategoryService(category);

    if(!carCategory || carCategory.length === 0) {
      return res.status(STATUS_CODES.NOT_FOUND.code).json({
        success: false,
        message: "category not found",
        status: STATUS_CODES.NOT_FOUND.code,
        data: []
      });
    }

    res.status(STATUS_CODES.OK.code).json({
      success: true,
      message: "car category fetch successfully.",
      status: STATUS_CODES.OK.code,
      data: carCategory
    });
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
      return res.status(STATUS_CODES.NOT_FOUND.code).json({
        success: false,
        message: "No cars found for this body type",
        status: STATUS_CODES.NOT_FOUND.code,
        data: [],
      });
    }

    return res.status(STATUS_CODES.OK.code).json({
      success: true,
      message: "Cars fetched successfully by body type",
      status: STATUS_CODES.OK.code,
      total: cars.length,
      data: cars,
    });
  } catch (error) {
    next(error);
  }
};

// brand list 
export const brandListController = async (req, res, next) => {
  try {
    const brands = await carBrandListService();

    res.status(STATUS_CODES.OK.code).json({
      success: true,
      message: "car brand list fetch successfully.",
      message: STATUS_CODES.OK.message,
      total: brands.length,
      data: brands,
    });
  } catch(error) {
    next(error);
  }
}

// category list
export const categoryListController = async (req, res, next) => {
  try {
    const categories = await carCategoryListService();

    res.status(STATUS_CODES.OK.code).json({
      success: true,
      message: "car category list fetch successfully.",
      message: STATUS_CODES.OK.message,
      total: categories.length,
      data: categories,
    });
  } catch(error) {
    next(error);
  }
}

// bodytype lis
export const bodyTypeListController = async (req, res, next) => {
  try {
    const bodyType = await carBodytypeListService();

    res.status(STATUS_CODES.OK.code).json({
      success: true,
      message: "car bodyType list fetch successfully.",
      message: STATUS_CODES.OK.message,
      total: bodyType.length,
      data: bodyType,
    });
  } catch(error) {
    next(error);
  }
}