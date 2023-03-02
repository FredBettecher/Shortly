import { Router } from "express";
import { postSignin, postSignup } from "../controllers/auth.controller.js";
import { validateSignin, validateSignup } from "../middlewares/auth.middleware.js";

export const authRoutes = Router();
authRoutes.post("/signup", validateSignup, postSignup);
authRoutes.post("/signin", validateSignin, postSignin);