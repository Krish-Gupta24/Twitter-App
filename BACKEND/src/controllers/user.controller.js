import User from "../models/user.models.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const generateTokens = async (userId,res) => {
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

export const signupUser = async (req, res) => {
    try {
      const { fullName, email, password, username } = req.body;
      if (!username) {
        return res.status(400).json({ message: "Username not entered" });
      }
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
    const user = new User({ username,fullName, email, password: hashedPassword });
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

export const loginUser = async (req, res) => {
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

export const logoutUser = async (req,res) => {
  try {
    res.clearCookie("token", " ")
    return res.status(200).json({ message: "Logout done" });
  } catch (error) {
    return res.json({
      message: "Server error"
    });
  }
}

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, email, password, profilePic, bio, username } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (fullName) user.fullName = fullName;
    if (bio) user.bio = bio;
    if (profilePic) user.profilePic = profilePic;
    
  
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    
    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const user = await User.findById(userId);
    const userToFollow = await User.findById(id);
    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }
    if (userToFollow._id.toString() === userId) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }
    if (user.followings.includes(id)) {
      user.followings = user.followings.filter((userId) => userId.toString() !== id);
      userToFollow.followers = userToFollow.followers.filter((userId) => userId.toString() !== userId);
    } else {
      user.followings.push(id);
      userToFollow.followers.push(userId);
    }
    await user.save();
    await userToFollow.save();
    res.status(200).json({ message: "Operation successful" });

  }catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("followers").populate("followings");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}