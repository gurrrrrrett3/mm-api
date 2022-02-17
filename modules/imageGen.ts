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

    let tiles: {
      top: Buffer | null;
      bottom: Buffer | null;
      left: Buffer | null;
      right: Buffer | null;
    } = {
      top: null,
      bottom: null,
      left: null,
      right: null,
    };
    //if player is 32 blocks or less from edge of tile, get tile
    if (edges.bottom) {
      tiles.bottom = await Map.getTile(edges.bottom, playerData.z, 3, "world");
    }
    if (edges.top) {
      tiles.top = await Map.getTile(edges.top, playerData.z, 3, "world");
    }
    if (edges.left) {
      tiles.left = await Map.getTile(playerData.x, edges.left, 3, "world");
    }
    if (edges.right) {
      tiles.right = await Map.getTile(playerData.x, edges.right, 3, "world");
      fs.writeFileSync(`./test.png`, tiles.right);
    }

    const canvas = Canvas.createCanvas(64, 64);
    const ctx = canvas.getContext("2d");


    console.log(canvas.toDataURL());

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
