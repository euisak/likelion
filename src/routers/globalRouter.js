import express from "express";
import { home } from '../controllers/postController.js';
import {join, login} from "../controllers/userController";
import {trending, search} from "../controllers/postController";

const globalRouter = express.Router();

globalRouter.get('/', home);
globalRouter.get("/", trending);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;
