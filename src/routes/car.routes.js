import { Hono } from "hono";
import {
  validateCarRequest,
  validateCarUpdate,
  validateCarDelete,
  validateCarId,
  validateCarSearch,
  validateBrand
} from "../middleware/car.middleware.js";
import {
  allCarsController,
  bodyTypeListController,
  bodyTypeSearchController,
  brandListController,
  brandSearchController as brandSearchCntl,
  carbyIdController,
  categoryListController,
  categorySearchController as categorySearchCntl,
  bodyTypeSearchController as bodyTypeSearchCntl,
  createCarController,
  deleteCarController,
  searchCarsController,
  updateCarController
} from "../controllers/car.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";

const carRouter = new Hono();

// ======================================== admin car creation routes =================================//

// Admin routes - require auth and admin
carRouter.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validateCarRequest,
  createCarController
);

carRouter.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validateCarUpdate,
  updateCarController
);

carRouter.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validateCarDelete,
  deleteCarController
);

// User routes - public
carRouter.get("/", allCarsController);
carRouter.get("/search/:id", validateCarId, carbyIdController);
carRouter.get("/search", validateCarSearch, searchCarsController);
carRouter.get("/brand/:brand", validateBrand, brandSearchCntl);
carRouter.get("/brands", brandListController);
carRouter.get("/category", categoryListController);
carRouter.get("/category/:category", categorySearchCntl);
carRouter.get("/bodytype", bodyTypeListController);
carRouter.get("/bodytype/:bodyType", bodyTypeSearchCntl);

export default carRouter;