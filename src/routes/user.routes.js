import { Hono } from "hono";
import { createUserController, loginUserController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const userRouter = new Hono();

// POST /api/user - Create user
userRouter.post("/", async (c, next) => {
  const result = await createUserController(c, next);
  return result;
});

// POST /api/user/login - Login user
userRouter.post("/login", async (c, next) => {
  const result = await loginUserController(c, next);
  return result;
});

export default userRouter;