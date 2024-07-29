import express from "express";
import { home, getUpload, postUpload, search, watch, increaseLike } from '../controllers/postController.js';
import {join, login} from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get('/', home);
globalRouter.route("/upload").get(getUpload).post(postUpload);

globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);
globalRouter.get("/post/:id", watch);
globalRouter.post("/post/:id/like", increaseLike);

export default globalRouter;


