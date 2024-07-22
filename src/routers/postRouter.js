import express from "express";
import { see, edit, upload, deletePost } from "../controllers/postController";
const postRouter = express.Router();

postRouter.get("/upload", upload);
postRouter.get("/:id(\\d+)", see);
postRouter.get("/:id(\\d+)/edit", edit);
postRouter.get("/:id(\\d+)/delete", deletePost);

export default postRouter;