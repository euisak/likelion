import express from "express";
import { watch, post, getEdit, postEdit, getUpload, postUpload, deletePost } from "../controllers/postController";
const postRouter = express.Router();

postRouter.get("/", post);

postRouter.get("/:id([0-9a-f]{24})", watch);
postRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
postRouter.route("/:id([0-9a-f]{24})/delete").get(deletePost);
postRouter.route("/upload").get(getUpload).post(postUpload);

export default postRouter;