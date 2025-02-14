
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    profilePic: {
        type: String
    },
    bio: {
        type: String,
        default: ""
    },
    username: {
        type: String,
        required: true,
        unique:true,
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    followings: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },

}, { timestamps: true })

const User = mongoose.model("User", userSchema)
export default User