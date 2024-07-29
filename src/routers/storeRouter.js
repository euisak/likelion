import express from "express";
import { store } from "../controllers/storeController.js";
const storeRouter = express.Router();

storeRouter.get("/", store);

export default storeRouter;
