import express, { Router } from "express";
import { addPost, deletePost, getPost, updatePost, userPosts } from "../controllers/post.controller.js";
import verifyJWT from "../middlewares/verifyJWT.js";
const router = Router();

router.route("/addpost").post(verifyJWT, addPost);
router.route("/updatepost/:postId").patch(verifyJWT, updatePost);
router.route("/deletepost/:postId").delete(verifyJWT, deletePost);
router.route("/allpost/:userId").get(userPosts);
router.route("/post/:postId").get(getPost);

export default router;