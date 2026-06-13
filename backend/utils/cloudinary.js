import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: "backend/config/config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// to upload image on cloudinary
export const upload_file = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto", // detect typr of file e.g; png, video .. by itself and handle
      folder: folder,
    });

    // Return the clean text data object that MongoDB schema expects
    return {
      public_id: result.public_id,
      url: result.secure_url, // for secure url e.g; https
    };
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw error; // Hand the error over to catchAsyncErrors
  }
};


// to delete image from cloudinary
export const delete_file = async (fileId) => {
  try {
    const res = await cloudinary.uploader.destroy(fileId);
    
    if (res?.result === "ok") return true;
    return false;
  } catch (error) {
    console.error("Cloudinary deletion failed:", error);
    return false;
  }
};

