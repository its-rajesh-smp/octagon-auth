export const ERROR_RESPONSES = {
  USER_ALREADY_EXISTS: { message: "User already exists", status: 400 },
  USER_NOT_FOUND: { message: "User not found", status: 404 },
  INVALID_CREDENTIALS: { message: "Invalid email or password", status: 401 },
  UNAUTHORIZED: { message: "Unauthorized access", status: 401 },
  FORBIDDEN: {
    message: "You do not have permission to perform this action",
    status: 403,
  },
  VALIDATION_ERROR: { message: "Validation failed", status: 400 },
  SERVER_ERROR: { message: "Internal server error", status: 500 },
  PASSWORD_MISMATCH: { message: "Passwords do not match", status: 400 },
  RESOURCE_NOT_FOUND: { message: "Requested resource not found", status: 404 },
  INVALID_INPUT: { message: "Invalid input provided", status: 400 },
};
