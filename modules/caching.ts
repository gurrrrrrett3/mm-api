import fs from "fs";
import path from "path";
import parse from "node-html-parser";
import mmInterface from "./interface";
import mmApi from "./fetch";
import { mmFetchPlayersReturn } from "./types";
import config from "../conifg.json"
export default class mmCaching {
  public lastCache: number;
  public timer: NodeJS.Timer;

  public reportData = {
    players: 0,
    sessions: 0,
    took: 0
  }
  
  public TIME_BETWEEN_CACHE_UPDATES = config.cacheInterval * 6e4; 

  constructor() {
    this.lastCache = Date.now();
    this.checkForCacheFiles();
    this.checkForCacheData();
    this.Cache();
    this.timer = setInterval(function() {}, 3e4);
  }

  //Save data so that we don't have to fetch it again
  public async Cache() {
    this.updateCacheTimestamp();    
    await this.cachePlayers();
    this.saveReport();
  }

  //Save player data to the cache
  public async cachePlayers() {
    const data = (await mmApi.fetch({
      endpoint: "players",
      timestamp: Date.now(),
    })) as mmFetchPlayersReturn;

    this.saveCache(data, "players");

    const queue: string[] = [];

    data.data.forEach((player) => {
      queue.push(parse(player.name).childNodes[0].rawText);
    });

    for (let i = 0; i < queue.length; i++) {
        const username = queue[i];
       await mmInterface.fetchPlayer(username).then((playerData) => {
          this.saveCachedPlayer(username, playerData);
          if (!playerData.sessions) return;
          this.reportData.players++;
          this.reportData.sessions += playerData.sessions.length;
        });
      }
   
  }

  //Quick utility functions

  public checkCacheTimestamp() {
    const data = this.getCacheData();
    return Date.now() - data.timestamp;
  }

  private updateCacheTimestamp() {
    this.lastCache = Date.now();
    let data = this.getCacheData();
    data.timestamp = this.lastCache;
    this.saveCacheData(data);
    }

    private saveReport() {
        const data = this.getCacheData();
        let report = this.reportData;
        report.took = Date.now() - data.timestamp;
        data.report = report;
        this.saveCacheData(data);
    }

    //Cache save and access functions

  private saveCache(data: any, file: string) {
    fs.writeFileSync(path.resolve(`./data/cache/${file}.json`), JSON.stringify(data));
  }

  public loadCache(file: string) {
    return JSON.parse(fs.readFileSync(path.resolve(`./data/mm/cache/${file}.json`), "utf8"));
  }

  public saveCachedPlayer(username: string, data: any) {
    fs.writeFileSync(path.resolve(`./data/cache/players/${username}.json`), JSON.stringify(data));
  }

  public loadCachedPlayer(username: string) {
    return JSON.parse(fs.readFileSync(path.resolve(`./data/cache/players/${username}.json`), "utf8"));
  }

  public getCacheData() {
    return JSON.parse(fs.readFileSync(path.resolve(`./data/cache/data.json`), "utf8"));
  }

  private saveCacheData(data: any) {
    fs.writeFileSync(path.resolve(`./data/cache/data.json`), JSON.stringify(data));
  }

  private checkForCacheData() {
    if (!fs.existsSync(path.resolve(`./data/cache/data.json`))) {
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

  private checkForCacheFiles() {
    if (!fs.existsSync(path.resolve(`./data/cache/players`))) {
      fs.mkdirSync(path.resolve(`./data/cache/players`), { recursive: true });
    }
  }
}
