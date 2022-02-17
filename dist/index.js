"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const api_mm_1 = __importDefault(require("./website/routers/api-mm"));
const App = (0, express_1.default)();
App.use("/api", api_mm_1.default);
App.use("/assets", express_1.default.static(path_1.default.join(__dirname, "website/assets")));
App.get("/", (req, res) => {
    res.sendFile(path_1.default.resolve(`./assets/index.html`));
});
App.listen(3000, () => {
    console.log("Server is running on port 3000\nhttp://localhost:3000");
});
