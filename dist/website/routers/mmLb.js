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
router.get('/playtime', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield interface_1.default.getLeaderboard('playtime'));
}));
router.get('/playtime/:stat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //@ts-expect-error
    res.send(yield interface_1.default.getLeaderboard('playtime', (_a = req.params.stat) !== null && _a !== void 0 ? _a : 'total'));
}));
router.get('/mobkills', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield interface_1.default.getLeaderboard('mobkills'));
}));
router.get("/mobkills/:stat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    //@ts-expect-error
    res.send(yield interface_1.default.getLeaderboard('mobkills', (_b = req.params.stat) !== null && _b !== void 0 ? _b : 'total'));
}));
router.get('/kills', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield interface_1.default.getLeaderboard('playerkills', 'total'));
}));
router.get('/kills/:stat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    //@ts-expect-error
    res.send(yield interface_1.default.getLeaderboard('playerkills', (_c = req.params.stat) !== null && _c !== void 0 ? _c : 'total'));
}));
exports.default = router;
