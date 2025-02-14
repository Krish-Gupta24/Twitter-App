import express, { Router } from "express";
import { addPost, deletePost, getFeed, getPost, likeUnlikePost, updatePost, userPosts } from "../controllers/post.controller.js";
import verifyJWT from "../middlewares/verifyJWT.js";
const router = Router();

router.route("/addpost").post(verifyJWT, addPost);
router.route("/updatepost/:postId").patch(verifyJWT, updatePost);
router.route("/deletepost/:postId").delete(verifyJWT, deletePost);
router.route("/allpost/:userId").get(verifyJWT,userPosts);
router.route("/post/:postId").get(verifyJWT,getPost);
router.route("/reply/:postId").patch(verifyJWT,getPost);
router.route("/like/:postId").put(verifyJWT,likeUnlikePost);
router.route("/feed").get(verifyJWT,getFeed);

export default router;