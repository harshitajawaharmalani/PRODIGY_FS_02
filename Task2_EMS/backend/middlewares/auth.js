export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // They are an admin, let them through!
  } else {
    res.status(403).json({ message: "Access Denied: Admins Only" });
  }
};