import { STATUS_CODES } from "../helpers/error.helper.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
// import userModel from "../models/user.model.js";

export const userCheck = async (req, res, next) => {
    const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(STATUS_CODES.BAD_REQUEST.code).json({
      success: false,
      message: STATUS_CODES.BAD_REQUEST.message,
    });
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    return res.status(STATUS_CODES.CONFLICT.code).json({
      success: false,
      message: STATUS_CODES.CONFLICT.message,
    });
  }

  next();
};
