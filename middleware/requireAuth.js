import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  const secret = 'asdfe45we45w345wegw345werjktjwertkj';

  if (!authorization) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, secret);

    req.user = { id: _id }; // 🔥 normalize user shape
    next();
  } catch (e) {
    return res.status(401).json({ message: "Request is not authorized" });
  }
};

export { requireAuth };
