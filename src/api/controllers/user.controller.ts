import { Request, Response } from "express";
import { UserDTO } from "../dtos";
import { UserService } from "../services";
import { compareHash, createHash } from "../utils/bcrypt.util";
import { createJWTToken } from "../utils/jwt.util";
import { sendErrorResponse, sendResponse } from "../utils/response.util";

/**
 * Gets the current user.
 *
 * Retrieves the user with the given id from the request, and returns the
 * user details without the password. If the user does not exist, it sends
 * a 404 response.
 *
 * @param req - The request object containing the user id.
 * @param res - The response object used to send the response.
 * @returns A response with the user details, or a 404 error response if the
 *          user does not exist.
 */
const getUser = async (req: Request, res: Response) => {
  const { id } = req.user;

  const existingUser = await UserService.getAUserByCondition({ id });

  if (!existingUser) {
    return sendErrorResponse(res, null, "USER_NOT_FOUND");
  }

  const payload = {
    ...existingUser,
    password: undefined,
  };

  return sendResponse(res, payload);
};

/**
 * Registers a new user.
 *
 * Validates the user's registration details and checks if a user with the
 * provided email already exists. If the user does not exist, it creates a
 * new user with a hashed password, generates an authentication token, and
 * returns the user details along with the token.
 *
 * @param req - The request object containing user registration details.
 * @param res - The response object used to send the response.
 * @returns A response with the newly created user details and an auth token,
 *          or an error response if the user already exists.
 */
const registerUser = async (req: Request, res: Response) => {
  const { email, password } = UserDTO.userRegistrationSchema.parse(req.body);

  const existingUser = await UserService.getAUserByCondition({ email });

  if (existingUser) {
    return sendErrorResponse(res, null, "USER_ALREADY_EXISTS");
  }

  const hashedPassword = await createHash(password);

  const user = await UserService.createUser({
    email,
    password: hashedPassword,
  });

  const authToken = createJWTToken({ id: user.id, email: user.email });

  const payload = {
    ...user,
    authToken,
    password: undefined,
  };

  return sendResponse(res, payload);
};

/**
 * Authenticates a user and generates an authentication token.
 *
 * Validates the user's login credentials and checks if a user with the
 * provided email exists. If the user exists, it checks if the provided
 * password matches the stored password. If the password is correct, it
 * generates an authentication token and returns the user details along
 * with the token.
 *
 * @param req - The request object containing user login details.
 * @param res - The response object used to send the response.
 * @returns A response with the user details and an auth token, or an error
 *          response if the user does not exist or the password is incorrect.
 */
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = UserDTO.userLoginSchema.parse(req.body);

  const user = await UserService.getAUserByCondition({ email });

  if (!user) {
    return sendErrorResponse(res, null, "USER_NOT_FOUND");
  }

  const isValidPassword = await compareHash(password, user.password);

  if (!isValidPassword) {
    return sendErrorResponse(res, null, "INVALID_CREDENTIALS");
  }

  const authToken = createJWTToken({ id: user.id, email: user.email });

  const payload = {
    ...user,
    authToken,
    password: undefined,
  };

  return sendResponse(res, payload);
};

export default { getUser, registerUser, loginUser };
