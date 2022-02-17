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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const node_html_parser_1 = __importDefault(require("node-html-parser"));
const interface_1 = __importDefault(require("./interface"));
const fetch_1 = __importDefault(require("./fetch"));
class mmCaching {
    constructor() {
        this.reportData = {
            players: 0,
            sessions: 0,
            took: 0
        };
        this.TIME_BETWEEN_CACHE_UPDATES = 1000 * 60 * 60; //1 hour 
        this.lastCache = Date.now();
        this.checkForCacheFiles();
        this.checkForCacheData();
        this.Cache();
        this.timer = setInterval(function () { }, 5000 * 60);
    }
    Cache() {
        return __awaiter(this, void 0, void 0, function* () {
            this.updateCacheTimestamp();
            yield this.cachePlayers();
            this.saveReport();
        });
    }
    cachePlayers() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = (yield fetch_1.default.fetch({
                endpoint: "players",
                timestamp: Date.now(),
            }));
            this.saveCache(data, "players");
            const queue = [];
            data.data.forEach((player) => {
                queue.push((0, node_html_parser_1.default)(player.name).childNodes[0].rawText);
            });
            for (let i = 0; i < queue.length; i++) {
                const username = queue[i];
                yield interface_1.default.fetchPlayer(username).then((playerData) => {
                    this.saveCachedPlayer(username, playerData);
                    if (!playerData.sessions)
                        return;
                    this.reportData.players++;
                    this.reportData.sessions += playerData.sessions.length;
                });
            }
        });
    }
    checkCacheTimestamp() {
        const data = this.getCacheData();
        return Date.now() - data.timestamp;
    }
    updateCacheTimestamp() {
        this.lastCache = Date.now();
        let data = this.getCacheData();
        data.timestamp = this.lastCache;
        this.saveCacheData(data);
    }
    saveReport() {
        const data = this.getCacheData();
        let report = this.reportData;
        report.took = Date.now() - data.timestamp;
        data.report = report;
        this.saveCacheData(data);
    }
    saveCache(data, file) {
        fs_1.default.writeFileSync(path_1.default.resolve(`./data/cache/${file}.json`), JSON.stringify(data));
    }
    loadCache(file) {
        return JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(`./data/mm/cache/${file}.json`), "utf8"));
    }
    saveCachedPlayer(username, data) {
        fs_1.default.writeFileSync(path_1.default.resolve(`./data/cache/players/${username}.json`), JSON.stringify(data));
    }
    loadCachedPlayer(username) {
        return JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(`./data/cache/players/${username}.json`), "utf8"));
    }
    getCacheData() {
        return JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(`./data/cache/data.json`), "utf8"));
    }
    saveCacheData(data) {
        fs_1.default.writeFileSync(path_1.default.resolve(`./data/cache/data.json`), JSON.stringify(data));
    }
    checkForCacheData() {
        if (!fs_1.default.existsSync(path_1.default.resolve(`./data/cache/data.json`))) {
            this.saveCacheData({
                timestamp: Date.now(),
                report: {
                    players: 0,
                    sessions: 0,
                    took: 0
                }
            });
        }
    }
    checkForCacheFiles() {
        if (!fs_1.default.existsSync(path_1.default.resolve(`./data/cache/players`))) {
            fs_1.default.mkdirSync(path_1.default.resolve(`./data/cache/players`), { recursive: true });
        }
    }
}
exports.default = mmCaching;
