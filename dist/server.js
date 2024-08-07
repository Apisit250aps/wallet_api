"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./db"));
const port = process.env.PORT || 3000;
app_1.default.listen(port, () => {
    (0, db_1.default)();
    console.log(`Server is running at http://localhost:${port}`);
});
