import { Request, Response } from "express";
import { UserDTO } from "../dtos";
import { UserService } from "../services";
import { createHash } from "../utils/bcrypt.util";
import { createJWTToken } from "../utils/jwt.util";
import { sendErrorResponse, sendResponse } from "../utils/response.util";

const getUser = async (req: Request, res: Response) => {
  return sendResponse(res, req.user);
};

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

export default { getUser, registerUser };
