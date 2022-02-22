import fetch from "node-fetch";
import fs from "fs";
import config from "../config.json";
import { mmFetchMapPlayersReturn, mmFetchMapTile, Player } from "./types";
import mmInterface, { Cache } from "./interface";
export default class mmMap {
  public static async fetchPlayers(): Promise<mmFetchMapPlayersReturn> {
    const endpoint = "/tiles/players.json";
    const res = await fetch(`${config.mapUrl}${endpoint}`);
    const data = await res.json();
    Cache.saveCache(data, "mapPlayers");
    return data as mmFetchMapPlayersReturn;
  }

  public static async fetchTile(options: mmFetchMapTile) {
    const endpoint = this.genEndpoint(options);
    console.log(`${config.mapUrl}${endpoint}`);
    const res = await fetch(`${config.mapUrl}${endpoint}`);
    const data = await res.buffer();
    return data;
  }

  public static coordsToTile(x: number, z: number, zoom: number) {
    zoom > 3 ? (zoom = 3) : zoom;
    let scale = this.genScale(zoom);

    return {
      x: Math.floor(x / scale),
      z: Math.floor(z / scale),
    };
  }

  public static async getTile(x: number, z: number, zoom: number, world: string) {
    const tile = this.coordsToTile(x, z, zoom);
    const options: mmFetchMapTile = {
      endpoint: "tile",
      x: tile.x,
      z: tile.z,
      zoom: zoom,
      world: world,
    };
    const data = await this.fetchTile(options);
    return data;
  }

  public static getEdges(x: number, z: number, zoom: number) {
    //get closest tile edge coordinates
    const edges = {
      top: x - (x % this.genScale(zoom)),
      bottom: x - (x % this.genScale(zoom)) + this.genScale(zoom),
      left: z - (z % this.genScale(zoom)),
      right: z - (z % this.genScale(zoom)) + this.genScale(zoom),
    };
    return edges;
  }

  public static genScale(zoom: number) {
    switch (zoom) {
      case 5:
      case 4:
      case 3:
        return 512;
      case 2:
        return 1024;
      case 1:
        return 2048;
      default:
        return 4096;
    }
  }

  private static genEndpoint(options: mmFetchMapTile) {
    return `/tiles/${options.world}/${options.zoom}/${options.x}_${options.z}.png`;
  }
}
