const cloudinary = require("cloudinary").v2; // Cloudinary SDK for image uploads

const CloudinaryAccount= cloudinary.config({
    cloud_name: "dtopjfdrv", // Replace with your Cloudinary cloud name
    api_key: "143731728968945", // Replace with your Cloudinary API key
    api_secret: "VtJIz3Ja9EBYjc5B4jZKwGcodh8", // Replace with your Cloudinary API secret
  });

  module.exports=CloudinaryAccount;