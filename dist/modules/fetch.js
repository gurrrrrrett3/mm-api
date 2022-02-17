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
const node_fetch_1 = __importDefault(require("node-fetch"));
const apiUrl = "http://obelisk.game-server.cc:8804/v1";
class mmApi {
    static fetch(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = this.genEndpoint(options);
            const query = this.genQuery(options);
            const url = `${apiUrl}${endpoint}${query}`;
            const response = yield (0, node_fetch_1.default)(url).catch((err) => {
                this.handleFetchError(err, url);
            });
            if (!response)
                return {
                    error: true,
                    message: "Failed to fetch data",
                };
            const data = yield response.json().catch((err) => {
                this.handleFetchError(err, url);
                return {
                    error: true,
                    message: "Failed to parse data as JSON",
                    err,
                };
            });
            console.log(url);
            return this.dataTyper(data, options);
        });
    }
    static genEndpoint(options) {
        switch (options.endpoint) {
            case "overview":
                return `/network/overview`;
            case "sessionsOverview":
                return `/network/sessionsOverview`;
            case "playerbaseOverview":
                return `/network/playerbaseOverview`;
            case "sessions":
                return `/sessions`;
            case "pingTable":
                return `/network/pingTable`;
            case "servers":
                return `/network/servers`;
            case "graph":
                return `/graph`;
            case "player":
                return `/player`;
            case "players":
                return `/players`;
            default:
                //@ts-expect-error
                console.log("mmFetch: genEndpoint: Unknown endpoint: " + options.endpoint);
                return `Error`;
        }
    }
    static genQuery(options) {
        let out = "?";
        Object.keys(options).forEach((key) => {
            if (key !== "endpoint") {
                //@ts-expect-error
                out += `${key}=${options[key]}&`;
            }
        });
        out = out.slice(0, -1);
        return out;
    }
    static dataTyper(data, options) {
        switch (options.endpoint) {
            case "overview":
                return data;
            case "sessionsOverview":
                return data;
            case "playerbaseOverview":
                return data;
            case "sessions":
                return data;
            case "pingTable":
                return data;
            case "servers":
                return data;
            case "graph":
                return data;
            case "player":
                return data;
            case "players":
                return data;
        }
    }
    static handleFetchError(err, url) {
        console.log(`Failed to fetch ${url}`);
    }
}
exports.default = mmApi;
