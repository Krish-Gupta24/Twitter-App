import express from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import {
  signupUser,
  loginUser,
  logoutUser,
  updateProfile,
  followUnfollowUser,
  getGlobalUser,
  getUser,
  getAllUsers,
  getGlobalUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

const userRouter = express.Router();

// Public Routes
userRouter.route("/signup").post(signupUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(logoutUser);

// Protected Routes (Requires Authentication)
userRouter.route("/update").patch(
  verifyJWT,
  upload.single("profilePic"),
  updateProfile
);

userRouter.route("/follow/:id").patch(verifyJWT, followUnfollowUser);
userRouter.route("/explore").get(verifyJWT, getAllUsers);
userRouter.route("/profile").get(verifyJWT, getGlobalUser);
userRouter.route("/:username").get(verifyJWT, getUser);

export default userRouter;
