const cloudinary = require("cloudinary").v2; 

cloudinary.config({
    cloud_name: "dtopjfdrv", 
    api_key: "143731728968945", // Replace with your Cloudinary API key
    api_secret: "VtJIz3Ja9EBYjc5B4jZKwGcodh8", // Replace with your Cloudinary API secret
  });

  module.exports= cloudinary;