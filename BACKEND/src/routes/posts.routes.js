import express, { Router } from "express";
import { addPost, updatePost } from "../controllers/post.controller.js";
import verifyJWT from "../middlewares/verifyJWT.js";
const router = Router();

router.route("/addpost").post(verifyJWT, addPost);
router.route("/updatepost/:postId").patch(verifyJWT, updatePost);

export default router;