import express from "express"
import { signupUser,loginUser, logoutUser } from "../controllers/user.controller.js"

const userRouter = express.Router()

userRouter.route('/signin').post(signupUser)
userRouter.route('/login').post(loginUser)
userRouter.route('/logout').post(logoutUser)

export default userRouter