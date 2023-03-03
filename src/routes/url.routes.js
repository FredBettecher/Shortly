import { Router } from "express";
import { getShortUrl, postUrlShorten } from "../controllers/url.controller.js";
import { validateUrl, validateUrlById } from "../middlewares/url.middleware.js";

export const urlRoutes = Router();
urlRoutes.post("/urls/shorten", validateUrl, postUrlShorten);
urlRoutes.get("/urls/:id", validateUrlById, getShortUrl);