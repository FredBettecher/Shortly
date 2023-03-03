import { Router } from "express";
import { getUsersMe } from "../controllers/users.controller.js";
import { validateUserMe } from "../middlewares/users.middleware.js";

export const usersRoutes = Router();
usersRoutes.get("/users/me", validateUserMe, getUsersMe)