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
  origin: config.frontendUrl,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
mongoose
  .connect(config.mongoUrl)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use('/api/add', addRoute);
app.use("/api/user", userRoute);
app.use("/api/bag", bagRoute);

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});