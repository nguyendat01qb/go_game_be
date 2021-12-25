const jwt = require("jsonwebtoken");

exports.adminMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Access token not found" });
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decoded.Role !== 1) {
      res.status(400).json({
        success: false,
        message: "Access not define",
      });
    } else {
      next();
    }
  } catch (error) {
    return res
      .status(403)
      .json({ success: false, message: "Invalid access token" });
  }
};

exports.requireSignin = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = user;
      next();
    } else {
      return res.status(400).json({ message: "Required signin" });
    }
  } catch (error) {}
};
