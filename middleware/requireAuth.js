import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    const secret = 'asdfe45we45w345wegw345werjktjwertkj';

    if (!authorization) {
        return res.status(401).json({ message: "Authorization token is required" });
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, secret);
        req.user = await User.findById(_id).select('_id'); // Finds the user by _id and attaches it to the req object

        if (!req.user) {
            return res.status(401).json({ message: "User not found, request is not authorized" });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (e) {
        return res.status(401).json({ message: "Request is not authorized", error: e.message });
    }
};

export { requireAuth };
