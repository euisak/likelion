import express from "express";
import { watch, post, getEdit, postEdit, deletePost, addComment, editComment, deleteComment } from "../controllers/postController";

const postRouter = express.Router();

postRouter.get("/", post);
postRouter.get("/:id([0-9a-fA-F]{24})", watch);
postRouter.route("/:id([0-9a-fA-F]{24})/edit").get(getEdit).post(postEdit);
postRouter.route("/:id([0-9a-fA-F]{24})/delete").get(deletePost);

postRouter.post('/:postId([0-9a-fA-F]{24})/comment', addComment);

// 댓글 수정 및 삭제
postRouter.post('/:postId([0-9a-fA-F]{24})/comment/:commentId([0-9a-fA-F]{24})/edit', editComment);
postRouter.post('/:postId([0-9a-fA-F]{24})/comment/:commentId([0-9a-fA-F]{24})/delete', deleteComment);


export default postRouter;
