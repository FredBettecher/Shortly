import { Router } from "express";
import { deleteUrlById, getOpenShortUrl, getShortUrl, postUrlShorten } from "../controllers/url.controller.js";
import { validateDeleteUrl, validateShortUrl, validateUrl, validateUrlById } from "../middlewares/url.middleware.js";

export const urlRoutes = Router();
urlRoutes.post("/urls/shorten", validateUrl, postUrlShorten);
urlRoutes.get("/urls/:id", validateUrlById, getShortUrl);
urlRoutes.get("/urls/open/:shortUrl", validateShortUrl, getOpenShortUrl);
urlRoutes.delete("/urls/:id", validateDeleteUrl, deleteUrlById);