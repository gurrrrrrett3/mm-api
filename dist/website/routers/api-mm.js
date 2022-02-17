"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const interface_1 = __importDefault(require("../../modules/interface"));
const mmPlayer_1 = __importDefault(require("./mmPlayer"));
const mmLb_1 = __importDefault(require("./mmLb"));
const router = (0, express_1.Router)();
router.use("/player", mmPlayer_1.default);
router.use("/lb", mmLb_1.default);
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendFile(path_1.default.resolve(`./assets/groups/mm/html/index.html`));
}));
router.get("/onlinelist", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield interface_1.default.getOnlineSessons();
    let sendData = [];
    data.forEach((session) => {
        sendData.push(session.name);
    });
    res.send(sendData);
}));
exports.default = router;
