export const adminMiddleware = async (c, next) => {
  try {
    if (!c.get("user")?.id) {
      return c.json({
        success: false,
        message: "Authentication required.",
        data: null,
      }, 401);
    }

    // TODO: Replace with D1 query to check user role
    // const user = await DB.from("users").select("role").where("id", "=", c.get("user").id).maybeSingle();

    // For now, assume user is admin for demo purposes - replace with actual D1 query
    const isAdmin = true; // Replace with: c.get("user").role === "admin"

    if (!isAdmin) {
      return c.json({
        success: false,
        message: "Admin access required.",
        data: null,
      }, 403);
    }

    await next();
  } catch (error) {
    next(error);
  }
};