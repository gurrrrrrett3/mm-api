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
const fetch_1 = __importDefault(require("./fetch"));
const node_html_parser_1 = __importDefault(require("node-html-parser"));
const interface_1 = __importDefault(require("./interface"));
class mmLeaderboard {
    static playtime(stat) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = (yield fetch_1.default.fetch({
                endpoint: "players",
                timestamp: Date.now(),
            }));
            let out = [];
            data.data.forEach((player) => __awaiter(this, void 0, void 0, function* () {
                const playername = (0, node_html_parser_1.default)(player.name).childNodes[0].rawText;
                const playerData = interface_1.default.getPlayer(playername);
                let f_playtime = "";
                switch (stat) {
                    case "total":
                        f_playtime = playerData.info.active_playtime;
                        break;
                    case "week":
                        f_playtime = playerData.online_activity.active_playtime_7d;
                        break;
                    case "month":
                        f_playtime = playerData.online_activity.active_playtime_30d;
                        break;
                }
                out.push({
                    name: playername,
                    playtime: interface_1.default.formatPlanDate(f_playtime),
                    f_playtime,
                });
            }));
            out.sort((a, b) => {
                return b.playtime - a.playtime;
            });
            return out.slice(0, 10);
        });
    }
    static mobKills(stat) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = (yield fetch_1.default.fetch({
                endpoint: "players",
                timestamp: Date.now(),
            }));
            let out = [];
            data.data.forEach((player) => __awaiter(this, void 0, void 0, function* () {
                const playername = (0, node_html_parser_1.default)(player.name).childNodes[0].rawText;
                const playerData = interface_1.default.getPlayer(playername);
                let mobKills = 0;
                switch (stat) {
                    case "total":
                        mobKills = playerData.kill_data.mob_kills_total;
                        break;
                    case "week":
                        mobKills = playerData.kill_data.mob_kills_7d;
                        break;
                    case "month":
                        mobKills = playerData.kill_data.mob_kills_30d;
                        break;
                }
                out.push({
                    name: playername,
                    mobKills,
                });
            }));
            out.sort((a, b) => {
                return b.mobKills - a.mobKills;
            });
            return out.slice(0, 10);
        });
    }
    static playerKills(stat) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = interface_1.default.getPlayers();
            let out = [];
            data.data.forEach((player) => __awaiter(this, void 0, void 0, function* () {
                const playername = (0, node_html_parser_1.default)(player.name).childNodes[0].rawText;
                const playerData = interface_1.default.getPlayer(playername);
                let playerKills = 0;
                switch (stat) {
                    case "total":
                        playerKills = playerData.kill_data.player_kills_total;
                        break;
                    case "week":
                        playerKills = playerData.kill_data.player_kills_7d;
                        break;
                    case "month":
                        playerKills = playerData.kill_data.player_kills_30d;
                        break;
                }
                out.push({
                    name: playername,
                    playerKills,
                });
            }));
            out.sort((a, b) => {
                return b.playerKills - a.playerKills;
            });
            return out.slice(0, 10);
        });
    }
}
exports.default = mmLeaderboard;
