const checkAdmin = (req, res, next) => {
  const user = req.user; 

  if (user && user.role === 'ADMIN') {
    next(); 
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};

module.exports = checkAdmin;