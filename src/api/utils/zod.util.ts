import { ZodError } from "zod";

export const formatZodError = (error: ZodError) => {
  return error.errors.map((err) => ({
    field: err.path.join("."), // Converts array path to string (e.g., "confirmPassword")
    message: err.message,
  }));
};
