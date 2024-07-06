// isAdmin.js

const isAdmin = (req, res, next) => {
  // Assuming the user role is stored in the request object after authentication
  const userRole = req.userRole;

  // Check if the user is an admin
  if (userRole !== "admin") {
    return res
      .status(403)
      .json({ message: "You are not authorized to perform this action" });
  }

  // If the user is an admin, allow the request to proceed
  next();
};

module.exports = isAdmin;
