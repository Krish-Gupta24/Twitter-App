import User from "../models/user.models.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser"

const generateTokens = async (userId,res) => {
    try {
        const token = jwt.sign(
            { id: userId },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )
    
        return res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 7*24*60*60*1000
        })
    } catch (error) {
      res.json({
        error: true,
        message:"server error"
      })
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

    await generateTokens(userId,res);
    const userResponse = user.toObject();

    delete userResponse.password;

    
      res.status(201).json({
        message: "User registered successfully",
        user: userResponse
      });
  
    } catch (error) {
      console.error("Error signing up user:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email) {
      return res.status(400).json({ message: "Email not entered" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password not entered" });
    }
  
    const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User donot exists" });
    }
    const passwordCheck = bcrypt.compare(password, user.password)
    
    if (!passwordCheck) {
      return res.status(400).json({ message: "Password incorrect" });
    }
  
    const userId= user._id
    await generateTokens(userId,res);
  
    const userResponse = user.toObject();

    delete userResponse.password;
  
  
    return res.status(201).json({
      message: "Logged In",
      user: userResponse
    }); 
  } catch (error) {
    res.json({
      error: true,
      message:"server error"
    })
  }
}

const logoutUser = async (req,res) => {
  try {
    res.clearCookie("token", " ")
    return res.status(200).json({ message: "Logout done" });
  } catch (error) {
    return res.json({
      message: "Server error"
    });
  }
}

export {
  signupUser,
  generateTokens,
  loginUser,
  logoutUser
}