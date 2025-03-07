import express from "express";
import { UserController } from "../controllers";

const router = express.Router();

router.get("/", UserController.getUser);
router.post("/", UserController.registerUser);

export default router;
