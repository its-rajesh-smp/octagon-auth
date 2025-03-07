import express from "express";
import { IRoute } from "../types/others.type";
import userRoutes from "./user.routes";

const router = express.Router();

const defaultRoutes: IRoute[] = [
  {
    path: "/user",
    route: userRoutes,
  },
];

// add default routes
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
