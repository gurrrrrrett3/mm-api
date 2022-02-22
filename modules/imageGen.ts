import fs from "fs";
import Canvas from "node-canvas";
import parse from "node-html-parser";
import { Cache } from "./interface";
import Map from "./map";
import { mmFetchMapPlayersReturn } from "./types";

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
    const canvas = Canvas.createCanvas(usernameClean.length * 16, 32);
    const ctx = canvas.getContext("2d");

    ctx.font = "24px monospace";
    

  }
}
