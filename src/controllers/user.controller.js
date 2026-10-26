import { createUserService, loginUserService } from "../services/user.service.js";
import { sendResponse } from "../helpers/response.helper.js";

export const createUserController = async (c, next) => {
  try {
    const { username, email, password } = c.req.json();
    const createdUser = await createUserService({ username, email, password });

    return sendResponse(
      c,
      201,
      true,
      "User created successfully.",
      createdUser
    );
  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 400);
  }
};

export const loginUserController = async (c, next) => {
  try {
    const { email, password } = c.req.json();
    const result = await loginUserService(email, password);

    return sendResponse(
      c,
      200,
      true,
      "Login successful.",
      result
    );
  } catch (error) {
    return c.json({
      success: false,
      message: error.message,
      data: null,
    }, 401);
  }
};