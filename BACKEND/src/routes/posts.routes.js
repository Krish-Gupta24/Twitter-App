import express, { Router } from "express";
import { addPost, deletePost, updatePost } from "../controllers/post.controller.js";
import verifyJWT from "../middlewares/verifyJWT.js";
const router = Router();

router.route("/addpost").post(verifyJWT, addPost);
router.route("/updatepost/:postId").patch(verifyJWT, updatePost);
router.route("/deletepost/:postId").delete(verifyJWT, deletePost);

export default router;