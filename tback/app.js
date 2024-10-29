require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');
const cookieParser = require("cookie-parser");
const config = require('./config');

const addRoute = require('./routes/product');
const bagRoute = require('./routes/bag');
const userRoute = require("./routes/user");

const app = express();

  app.use(cors({
    origin: 'https://tashan.onrender.com',
    credentials: true,
  }));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://tashan.onrender.com');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // For preflight requests, we need to respond with 200 status
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);  // End the OPTIONS request
    }
  
    next();  // Continue to the next middleware or route
  });
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));


// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'public')));

mongoose
  .connect(config.mongoUrl)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use('/api/add', addRoute);
app.use("/api/user", userRoute);
app.use("/api/bag", bagRoute);
app.get('/keep-alive', (req, res) => {
  res.send('OK');
});

// Anything that doesn't match the above, send back the index.html file


app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});