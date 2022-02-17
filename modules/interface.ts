import mmCaching from "./caching";
import mmApi from "./fetch";
import mmLeaderboard from "./leaderboard";
import { mmFetchPlayerReturn, mmFetchPlayersReturn, mmFetchSessionsReturn, Session } from "./types";

const Cache = new mmCaching();


/**
 * Interface for the website to use
 * Makes it simplier to access things
 */
export default class mmInterface {

  //converts a plan date (12d 1h 4m 3s) to seconds
  public static formatPlanDate(date: string) {
    const dateArr = date.split(" ");
    const cleanDateArr = dateArr.map((date) => {
      return parseInt(date.replace(/\D/g, ""));
    });
    const length = dateArr.length;
    let time = 0;

    let sec = cleanDateArr[length - 1];
    let min = cleanDateArr[length - 2];
    let hour = cleanDateArr[length - 3];
    let day = cleanDateArr[length - 4];

    if (day) time += day * 24 * 60 * 60;
    if (hour) time += hour * 60 * 60;
    if (min) time += min * 60;
    if (sec) time += sec;

    return time;
  }
//Creates a list of online players
  public static async generatePlayerList() {
    const sessions = await mmInterface.getOnlineSessons();
    let players: string[] = [];

    sessions.forEach((session) => {
      players.push(session.name);
    });
  }
  //Get's a player's data from the cache
  public static getPlayer(playerName: string) {
    const data = Cache.loadCachedPlayer(playerName);
    return data as mmFetchPlayerReturn;
  }

  //Gets the full player data file from the cache
  public static getPlayers() {
    return Cache.loadCache("players") as mmFetchPlayersReturn;
  }

  //Forces a player to be fetched, and saves it to the cache
  public static async fetchPlayer(playerName: string) {
    const data = (await mmApi.fetch({
      endpoint: "player",
      player: playerName,
    })) as mmFetchPlayerReturn;

    Cache.saveCachedPlayer(playerName, data);

    return data;
  }

  //Gets a list of sessions that are currently online 
  public static async getOnlineSessons() {
    const data = (await mmApi.fetch({
      endpoint: "sessions",
      timestamp: Date.now(),
    })) as mmFetchSessionsReturn;

    let out: Session[] = [];

    data.sessions.forEach((session) => {
      if (session.start.includes("Online")) {
        out.push(session);
      }
    });

    return out;
  }

  //Wrapper function for fetching and generating leaderboards
  public static async getLeaderboard(type: LeaderboardType, stat?: "total" | "week" | "month") {
    stat = stat || "total";
    switch (type) {
      case "playtime":
        return await mmLeaderboard.playtime(stat);
      case "mobkills":
        return await mmLeaderboard.mobKills(stat);
      case "playerkills":
        return await mmLeaderboard.playerKills(stat);
      default:
        return null;
    }
  }
}

//@TODO finish death and kd leaderboards
type LeaderboardType = "playtime" | "mobkills" | "playerkills" | "deaths" | "kd";
