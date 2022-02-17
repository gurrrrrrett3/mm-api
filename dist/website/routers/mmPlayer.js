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
const interface_1 = __importDefault(require("../../modules/interface"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({
        success: false,
        error: "Please specify a valid playername at /player/:playername"
    });
}));
router.get("/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = interface_1.default.getPlayer(req.params.username);
    res.send(data);
}));
router.get("/:username/sessions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = interface_1.default.getPlayer(req.params.username);
    res.send(data.sessions);
}));
router.get("/:username/sessions/:session", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = interface_1.default.getPlayer(req.params.username);
    res.send(data.sessions[parseInt(req.params.session)]);
}));
exports.default = router;
