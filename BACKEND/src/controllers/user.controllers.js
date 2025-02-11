import User from "../models/user.models.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser"

const generateTokens = async (userId) => {
    try {
        const token = jwt.sign(
            { id: userId },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
    
        return token;
    } catch (error) {
        console.log("server error");
    }
}

const signupUser = async (req, res) => {
    try {
    const { fullName, email, password } = req.body;
    if (!fullName) {
      return res.status(400).json({ message: "Full name not entered" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email not entered" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password not entered" });
    }
  
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }
      
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();
    const userId = user._id;

    if (!userId) return res.status(400).json({ success: false, message: "userid was not found" });

    const token = await generateTokens(userId);
    
    if (!token) {
      return res.status(400).json({ success: false, message: "no tokens were created" });
    }

    const userResponse = user.toObject();

    delete userResponse.password;

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,

      maxAge: 7*24*60*60*1000
    })
      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
      });
  
    } catch (error) {
      console.error("Error signing up user:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
};

const loginUser = async (req, res) => {
}
export {
    signupUser,
    generateTokens,

}