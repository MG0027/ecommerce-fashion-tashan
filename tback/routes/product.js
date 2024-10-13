const { Router } = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const checkAdmin = require('../middlewares/checkadmin');
const Product = require("../models/product");
const client = require('../client');

const router = Router();

// Initialize Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tashan', 
    allowed_formats: ['jpg', 'png'], 
  },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, rating, price, category, category2 } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imageUrl = req.file.path; 

    const newProduct = await Product.create({
      image: imageUrl,
      name,
      rating,
      price,
      category,
      category2,
    });

    await client.del('products'); // Clear cache to ensure fresh data

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while adding the product",
      error: error.message,
    });
  }
});

router.get('/', async (req, res) => {
  try {
    client.get('products', async (err, cachedProducts) => {
      if (err) {
        console.error('Error checking Redis:', err);
        return res.status(500).json({ error: 'Error checking Redis' });
      }

      if (cachedProducts) {
        console.log('Cache hit');
        return res.json(JSON.parse(cachedProducts));  
      }

      const products = await Product.find();
      client.setex('products', 3600, JSON.stringify(products));

      console.log('Cache miss');
      return res.json(products); 
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
});

module.exports = router;
