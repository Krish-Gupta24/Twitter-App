import User from "../models/user.models.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

export const generateTokens = async (userId) => {
  // ❌ Remove `res` from parameters
  try {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return token; // ✅ Only return token, don't return res.cookie()
  } catch (error) {
    console.error("Token generation error:", error);
    throw new Error("Token generation failed");
  }
};


export const signupUser = async (req, res) => {
  try {
    const { fullName, email, password, username } = req.body;

    // Validate input fields
    if (!username)
      return res.status(400).json({ message: "Username is required" });
    if (!fullName)
      return res.status(400).json({ message: "Full name is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password)
      return res.status(400).json({ message: "Password is required" });

    // Check if user already exists
    const existUser = await User.findOne({ email });
    if (existUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password using async function
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      username,
      fullName,
      email,
      password: hashedPassword,
    });
    await user.save();

    // Generate JWT token
    const token = await generateTokens(user._id);

    // Convert user object and remove sensitive info
    const userResponse = user.toObject();
    delete userResponse.password;

    // Set cookie with JWT token
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Change to true in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send response
    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    console.log("Login request received:", req.body);

    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: "Email not entered" });
    if (!password)
      return res.status(400).json({ message: "Password not entered" });

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User does not exist:", email);
      return res.status(400).json({ message: "User does not exist" });
    }

    // ✅ Fix bcrypt.compare() (Add await)
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      console.log("Incorrect password for:", email);
      return res.status(400).json({ message: "Password incorrect" });
    }

    const userId = user._id;

    // ✅ Call `generateTokens()` to get the token
    const token = await generateTokens(userId);

    // ✅ Set the cookie here in `loginUser`
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Change to `true` in production with HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log("User logged in:", userId);

    return res.status(200).json({
      message: "Logged In",
      token, // ✅ Send token in response
      user: { _id: user._id, email: user.email, fullName: user.fullName },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

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
    console.log("🟢 Request received for profile update");

    const userId = req.user.id;
    console.log("🔹 User ID:", userId);

    console.log("🖼️ Uploaded File:", req.file); // Log the uploaded file

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    // Upload to Cloudinary
    const avatar = await uploadOnCloudinary(req.file.path);
    console.log("☁️ Cloudinary Upload Response:", avatar);

    if (!avatar) {
      return res.status(500).json({ message: "Failed to upload to Cloudinary" });
    }

    // Update user profile
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profilePic = avatar.secure_url;
    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("❌ Error updating profile:", error);
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

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}