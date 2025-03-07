import express from "express";
import { UserController } from "../controllers";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", AuthMiddleware, UserController.getUser);
router.post("/login", UserController.loginUser);
router.post("/register", UserController.registerUser);

export default router;
