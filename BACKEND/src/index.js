import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import dbConnection from "./db/index.js"
import express from "express"
import app from "./app.js"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import postRouter from "./routes/posts.routes.js"

dotenv.config()

const PORT= process.env.PORT
app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`)
    dbConnection()
})
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())

//routes
app.use("/api/user", userRouter)
app.use("/api/post",postRouter)