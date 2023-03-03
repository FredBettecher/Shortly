import { Router } from "express";
import { getOpenShortUrl, getShortUrl, postUrlShorten } from "../controllers/url.controller.js";
import { validateShortUrl, validateUrl, validateUrlById } from "../middlewares/url.middleware.js";

export const urlRoutes = Router();
urlRoutes.post("/urls/shorten", validateUrl, postUrlShorten);
urlRoutes.get("/urls/:id", validateUrlById, getShortUrl);
urlRoutes.get("/urls/open/:shortUrl", validateShortUrl, getOpenShortUrl);