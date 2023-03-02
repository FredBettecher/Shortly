import { Router } from "express";
import { postSignup } from "../controllers/auth.controller.js";
import { validateSignup } from "../middlewares/auth.middleware.js";

export const authRoutes = Router();
authRoutes.post("/signup", validateSignup, postSignup);
