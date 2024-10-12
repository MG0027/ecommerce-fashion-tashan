require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path'); 
const addRoute = require('./routes/product');
const cookiePaser = require("cookie-parser");
const bagRoute = require('./routes/bag')
const userRoute = require("./routes/user");

const app = express();
const port = process.env.PORT || 2700;


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
})); 
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(cookiePaser());
app.use(express.urlencoded({extended: false}));


mongoose
  .connect(process.env.MONGO_URL|| "mongodb://127.0.0.1:27017/tashan")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use('/add', addRoute);
app.use("/user", userRoute);
app.use("/api", bagRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
