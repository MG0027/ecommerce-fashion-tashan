const { Router } = require("express");
const User = require("../models/user");

const jwt = require('jsonwebtoken');

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    console.log(token);
    return res.cookie('token', token, {
      httpOnly: true,
      secure: true,  // Ensure HTTPS is being used
      sameSite: 'None',  // Required for cross-site cookies
      // domain: '.onrender.com',  // Allows cookies across subdomains
      maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    }).json({ message: 'logged in' });
    
  } catch (error) {
    return res.status(404);
     
    };
  }
);



router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  await User.create({
    fullName,
    email,
    password,
  });
  return  res.status(201).json({ message: 'User registered successfully' });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,  // Match this with how the cookie was set
    sameSite: 'None',  // Match this with how the cookie was set
  });
  res.status(200).send({ message: 'Logged out successfully' });
});

router.get("/info", (req, res) => {
  
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  
  try {
    const decoded = jwt.verify(token, "$uperMan@123" );

    
    res.json({ 
      userId: decoded._id, 
      
    });
  }  catch (error) {
    console.error('Error verifying token:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token", error: error.message });
    } else if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired", error: error.message });
    } else {
      return res.status(401).json({ message: "Authentication failed", error: error.message });
    }
  }
});
module.exports = router;