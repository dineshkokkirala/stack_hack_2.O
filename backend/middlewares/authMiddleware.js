import jwt from "jsonwebtoken";
import Employe from "../models/employeModel.js";


// Employee Can access
const protect = async (req, res, next) => {
  let token;
  // && req.headers.authorization.startsWith("Bearer")  .split(" ")[1]
  if (req.headers.authorization) {
    try {
      token = req.headers.authorization;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Employe.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.log(err.message);
      return res.status(401).json({ err: "Not Authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ err: "Not Authorized, token failed" });
  }
};


// Only Admin access some routes
const isAdminUser = async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    try {
      token = req.headers.authorization;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Employe.findById(decoded.id).select("-password");
      if (req.user.isadmin) {
        next();
      } else {
        return res
          .status(401)
          .json({ err: "Not Authorized, You are not an admin" });
      }
    } catch (err) {
      console.log(err.message);
      return res
        .status(401)
        .json({ err: "Not Authorized, You are not an admin" });
    }
  }

  if (!token) {
    return res.status(401).json({ err: "Not Authorized, token failed" });
  }
};

export { protect, isAdminUser };
