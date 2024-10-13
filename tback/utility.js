const  cloudinary  = require('cloudinary').v2 ;
const fs = require('fs') 


// Initialize Cloudinary configuration once (if not already done)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: 'tashan', // Customize folder name as needed
      resource_type: 'auto', // Auto-detect file type
    });

    if (!response) {
      throw new Error('Something went wrong while uploading to Cloudinary!');
    }

    // Delete the local file after successful upload to cloud
    fs.unlinkSync(localFilePath);

    return response; // Return Cloudinary response, including the secure_url
  } catch (error) {
    // Remove the locally saved file if the upload operation fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    throw new Error(
       
      'Failed to upload file to Cloudinary!',
    );
  }
};

module.exports= { uploadOnCloudinary };