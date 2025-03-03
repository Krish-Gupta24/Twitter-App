import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });

    await fs.unlink(localFilePath); 
    return response;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error.message);

    try {
      await fs.unlink(localFilePath);
    } catch (unlinkError) {
      console.error("❌ Failed to delete local file:", unlinkError.message);
    }

    return null;
  }
};
