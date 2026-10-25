import { createUserService, loginUserService } from "../services/user.service.js";
import { STATUS_CODES } from "../helpers/error.helper.js";
import { sendResponse } from "../helpers/response.helper.js";
import bcrypt from "bcrypt";

export const createUserController = async (req, res, next) => {
  try {

    const { username, email, password } = req.body;
    const hashedpassword = await bcrypt.hash(password, 12);
    const createdUser = await createUserService({
      username,
      email, 
      password: hashedpassword
    });
        
    return sendResponse(
      res,
      201,
      true,
      "User created successfully.",
      createdUser
    );
  } catch(error) {
      next(error);
  }
}

export const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginUserService(email, password);

    return sendResponse(
      res,
      200,
      true,
      "Login successful.",
      result
    );
  } catch (error) {
    next(error);
  }
};