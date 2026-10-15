
import express from "express";
import { validateCarDelete, validateCarId, validateCarRequest, validateCarUpdate, validateCarSearch, validateBrand,  } from "../middleware/car.middleware.js";
import { allCarsController, bodyTypeListController, bodyTypeSearchController, brandListController, brandSearchController, carbyIdController, categoryListController, categorySearchController, createCarController, deleteCarController, searchCarsController, updateCarController } from "../controllers/car.controller.js";

const router = express.Router();

// admin car creation routes
router.post("/", validateCarRequest, createCarController);
router.patch("/:id", validateCarUpdate, updateCarController);
router.delete("/:id", validateCarDelete, deleteCarController);


// user routes
router.get("/", allCarsController);
router.get("/search/:id", validateCarId, carbyIdController);
router.get("/search", validateCarSearch, searchCarsController );
router.get("/brand/:brand", validateBrand, brandSearchController);
router.get("/brands", brandListController);
router.get("/category", categoryListController);
router.get("/category/:category", categorySearchController);
router.get("/bodytype", bodyTypeListController);
router.get("/bodytype/:bodyType", bodyTypeSearchController);

export default router;
