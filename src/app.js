import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRoutes } from "./routes/auth.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(authRoutes);

app.listen(process.env.PORT, () => console.log("App running on port:", process.env.PORT));