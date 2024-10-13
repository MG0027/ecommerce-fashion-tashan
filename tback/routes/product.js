const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const checkAdmin = require('../middlewares/checkadmin');
const Product = require("../models/product");
const client = require('../client'); 

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure the path is correctly resolved to the root of the project
    const uploadPath = path.resolve(__dirname, '../public/uploads');
    console.log("Uploading to:", uploadPath); // Log the path to ensure it's correct
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`; 
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, rating, price, category, category2 } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newProduct = await Product.create({
      image: `/uploads/${req.file.filename}`,
      name,
      rating,
      price,
      category,
      category2,
    });

   
    await client.del('products'); 

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
