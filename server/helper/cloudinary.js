import cloudinary from "cloudinary";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const { v2: cloudinaryV2 } = cloudinary;

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const storage = new multer.memoryStorage();
export const upload = multer({ storage });
export const ImageUploadUtil = async (file) => {
  const result = await cloudinaryV2.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
};
