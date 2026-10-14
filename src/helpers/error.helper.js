
export const STATUS_CODES = {
  OK: {
    code: 200,
    status: "OK",
    message: "Request successful",
  },

  CREATED: {
    code: 201,
    status: "Created",
    message: "Resource created successfully",
  },

  BAD_REQUEST: {
    code: 400,
    status: "Bad Request",
    message: "Invalid request",
  },

  UNAUTHORIZED: {
    code: 401,
    status: "Unauthorized",
    message: "Authentication required",
  },

  FORBIDDEN: {
    code: 403,
    status: "Forbidden",
    message: "Access denied",
  },

  NOT_FOUND: {
    code: 404,
    status: "Not Found",
    message: "Page not found",
  },

  METHOD_NOT_ALLOWED: {
    code: 405,
    status: "Method Not Allowed",
    message: "HTTP method not allowed",
  },

  CONFLICT: {
    code: 409,
    status: "Conflict",
    message: "Resource already exists",
  },

  UNPROCESSABLE_ENTITY: {
    code: 422,
    status: "Unprocessable Entity",
    message: "Validation failed",
  },

  INTERNAL_SERVER_ERROR: {
    code: 500,
    status: "Internal Server Error",
    message: "Something went wrong on the server",
  },

  SERVICE_UNAVAILABLE: {
    code: 503,
    status: "Service Unavailable",
    message: "Service is temporarily unavailable",
  },
};
