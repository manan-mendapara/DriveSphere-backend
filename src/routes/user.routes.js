import express from "express";
import { createUserController, loginUserController } from "../controllers/user.controller.js";
import { userCheck } from "../middleware/user.middleware.js";

const router = express.Router();

router.post("/", userCheck, createUserController);
router.post("/login", loginUserController);


export default router;