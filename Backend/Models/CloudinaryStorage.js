const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { v4: uuidv4 } = require("uuid");
const CloudinaryAccount = require("../Config/Cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: CloudinaryAccount,
  params: async (req, file) => {
    const originalExtension = file.originalname.split(".").pop();
    return {
      folder: "uploads",
      format: originalExtension,
      public_id: `${Date.now()}-${uuidv4()}`,
      resource_type: "image",
    };
  },
});

const Cloudinaryupload = multer({ storage });

module.exports = Cloudinaryupload;
