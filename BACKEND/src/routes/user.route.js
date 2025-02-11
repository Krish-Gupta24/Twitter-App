import express, { Router } from "express"
import { signupUser } from "../controllers/user.controllers.js"
import verifyJWT from "../middlewares/verifyJWT.js"

const userRouter = express.Router()

userRouter.route('/signin').post(signupUser)
userRouter.route('/login').post(verifyJWT,signupUser)

export default userRouter