import express from "express";
import { shopping } from "../controllers/shoppingController.js";
const shoppingRouter = express.Router();

shoppingRouter.get("/", shopping);

export default shoppingRouter;
