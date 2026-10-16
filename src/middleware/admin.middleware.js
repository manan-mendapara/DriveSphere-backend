import User from "../models/user.model.js";

export const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
        data: null,
      });
    }

    const user = await User.findById(req.user.id).select("role");

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
        data: null,
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};