import multer from "multer";
import fs from "fs";
import path from "path";

// Ensure the 'public/temp' folder exists
const uploadDir = path.join(process.cwd(), "public/temp");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create folder if it doesn't exist
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("📂 Upload Destination:", uploadDir); // Log destination
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    console.log("📸 Uploading File:", file.originalname); // Log file name
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage: storage });
