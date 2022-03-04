import fs from "fs";
import parse from "node-html-parser";
import { Cache } from "./interface";
import Map from "./map";
import { mmFetchMapPlayersReturn } from "./types";
import config from "../config.json";

export default class ImageGen {
  public static async getPlayerSnapshot(player: string) {
    const data = Cache.loadCache("mapPlayers") as mmFetchMapPlayersReturn;
    const playerData = data.players.find((p) => p.name.toLowerCase() === player.toLowerCase());
    if (!playerData) return null;

    //Get distance from edge of closest tiles
    const edges = Map.getEdges(playerData.x, playerData.z, 3);
  }

  public static async genPlayerUsernameImage(player: string) {
    const players = Cache.loadCache("mapPlayers") as mmFetchMapPlayersReturn;
    const playerData = players.players.find((p) => p.name.toLowerCase() === player.toLowerCase());
    if (!playerData) return null;
    const usernameClean = parse(playerData.display_name).childNodes[0].rawText;
  }
}
