"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("debug", true);
const connectDB = async () => {
    try {
        await mongoose_1.default.connect("mongodb+srv://apisit250aps:Phgs5srZYBulqDab@cluster0.jwfno.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
            socketTimeoutMS: 45000,
            connectTimeoutMS: 30000,
            autoIndex: false, // เพิ่มการตั้งค่านี้หากจำเป็น
        });
        console.log("MongoDB connected");
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
exports.default = connectDB;
