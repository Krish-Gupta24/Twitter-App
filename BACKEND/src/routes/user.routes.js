import express from "express"
import verifyJWT from "../middlewares/verifyJWT.js";
import { signupUser,loginUser, logoutUser, updateProfile, followUnfollowUser, getUser } from "../controllers/user.controller.js"

const userRouter = express.Router()

userRouter.route('/signin').post(signupUser)
userRouter.route('/login').post(loginUser)
userRouter.route('/logout').post(logoutUser)
userRouter.route('/update').patch(verifyJWT,updateProfile)
userRouter.route('/follow/:id').patch(verifyJWT,followUnfollowUser)
userRouter.route('/getuser').get(verifyJWT,getUser)

export default userRouter