"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jwt_1 = require("../utils/jwt");
const user_model_1 = require("../models/user.model");
const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1]; // Assuming the token is in the format "Bearer <token>"
        try {
            const decoded = (0, jwt_1.verifyToken)(token); // Ensure that decoded is of type IUser
            const user = await user_model_1.User.findById(decoded.userId); // ตรวจสอบว่าผู้ใช้ยังมีอยู่ในฐานข้อมูล
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            req.user = user; // Save user information to request object
            next();
        }
        catch (error) {
            return res.status(403).json({ error: "Forbidden" });
        }
    }
    else {
        return res.status(401).json({ error: "Unauthorized" });
    }
};
exports.authenticateJWT = authenticateJWT;
