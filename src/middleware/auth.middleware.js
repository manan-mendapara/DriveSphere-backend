import { verify } from "hono/jwt";

export const authMiddleware = async (c, next) => {
  try {
    const authHeader = c.req.header("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return c.json({
        success: false,
        message: "Authentication required.",
        data: null,
      }, 401);
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT using Hono's verify function with env secret
    const payload = await verify(token, c.env.JWT_SECRET);

    c.set("user", {
      id: payload.id,
    });

    if (!c.get("user")?.id) {
      return c.json({
        success: false,
        message: "Invalid authentication token.",
        data: null,
      }, 401);
    }

    await next();
  } catch (error) {
    return c.json({
      success: false,
      message: "Invalid or expired token.",
      data: null,
    }, 401);
  }
};