"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt_1.default.genSalt(saltRounds);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        return hashedPassword;
    }
    catch (error) {
        throw new Error("Error hashing password");
    }
};
exports.hashPassword = hashPassword;
const comparePasswords = async (plainPassword, hashedPassword) => {
    try {
        const match = await bcrypt_1.default.compare(plainPassword, hashedPassword);
        return match;
    }
    catch (error) {
        throw new Error("Error comparing passwords");
    }
};
exports.comparePasswords = comparePasswords;
