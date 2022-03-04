import mmCaching from "./caching";
import mmApi from "./fetch";
import mmLeaderboard from "./leaderboard";
import mmMap from "./map";
import {
  mmFetchPlayerReturn,
  mmFetchPlayersReturn,
  mmFetchSessionsReturn,
  mmFetchGraphReturn,
  Session,
  mmFetchServersReturn,
  mmFetchGraphServerTypes,
  mmFetchOverviewReturn,
  mmFetchPlayerbaseOverviewReturn,
} from "./types";
import config from "../config.json";
import mmTypeCheck from "./typeCheck";

const Cache = new mmCaching();
export { Cache };

setInterval(() => {
  mmMap.fetchPlayers();
}, config.mapCacheInterval * 1e3);

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

  public static async getOnlineSessionsPerServer(server: "survival" | "lobby") {
    const sessions = await mmInterface.getOnlineSessons();

    let out: Session[] = [];

    sessions.forEach((session) => {
      console.log(session.network_server);
      if (session.network_server === (server === "survival" ? "Survival" : "Lobby")) {
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

  /**
   *
   * @param server Server to get data from, defaults to survival
   */
  public static async getCurrentTPS(server: "survival" | "lobby" = "survival"): Promise<number> {
    let serverUUID = config.servers[server];

    let data = await mmApi.fetch({
      endpoint: "graph",
      server: serverUUID,
      type: "optimizedPerformance",
      timestamp: Date.now(),
    });

    if (!mmTypeCheck.isGraphReturn(data)) return 0;

    let tps: number | null = null;
    let currentIndex = data.values.length - 1;

    while (tps === null) {
      tps = data.values[currentIndex][2];
      currentIndex--;
    }

    return tps;
  }

  public static async getRankCounts(): Promise<{
    [key: string]: number;
  }> {
    let players: mmFetchPlayersReturn = Cache.loadCache("players");

    let ranks: { [key: string]: number } = {};

    players.data.forEach((player) => {
      let highestRank = player.primaryGroup.d;
      let indexOfHighestRank = Object.keys(ranks).indexOf(highestRank);

      if (indexOfHighestRank === -1) {
        ranks[highestRank] = 1;
      } else {
        ranks[highestRank]++;
      }
    });

    return ranks;
  }

  public static getHighestRank(ranks: string[]) {
    const rankOrder = config.ranks.map((rank) => {
      return rank.name;
    });

    let highestRank = "";

    ranks.forEach((rank) => {
      if (rankOrder.indexOf(rank) > rankOrder.indexOf(highestRank)) highestRank = rank;
    });

    return highestRank;
  }

  public static async getUptime() {
    let data = (await mmApi.fetch({
      endpoint: "servers",
      timestamp: Date.now(),
    })) as mmFetchServersReturn;

    let survivalServer = data.servers.find((s) => {
      return s.name === "Survival";
    });

    let lobbyServer = data.servers.find((s) => {
      return s.name === "Lobby";
    });

    return {
      survival: survivalServer?.current_uptime,
      lobby: lobbyServer?.current_uptime,
    };
  }

  public static async getGraphData(type: "tps" | "players") {
    let data = (await mmApi.fetch({
      endpoint: "graph",
      server: config.servers.survival,
      type: "optimizedPerformance",
      timestamp: Date.now(),
    })) as mmFetchGraphReturn;

    let tps = data.values.map((v) => {
      return [v[0], v[2]];
    });

    let players = data.values.map((v) => {
      return [v[0], v[1]];
    });

    switch (type) {
      case "tps":
        return tps;
      case "players":
        return players;
    }
  }

  public static async getNewPlayerCount(timeframe: "day" | "week" | "month") {
    let data = (await mmApi.fetch({
      endpoint: "playerbaseOverview",
      timestamp: Date.now(),
    })) as mmFetchOverviewReturn;

    let out = 0;

    switch (timeframe) {
      case "day":
        out = data.players.new_players_1d;
        break;
      case "week":
        out = data.players.new_players_7d;
        break;
      case "month":
        out = data.players.new_players_30d;
        break;
    }

    return out;
  }


  public static async getHigestPeak() {
    let data = (await mmApi.fetch({
      endpoint: "playerbaseOverview",
      timestamp: Date.now(),
    })) as mmFetchOverviewReturn;

    return data.numbers.best_peak_players;
  }

  //High Priority

  //Medium Priority

  //@TODO AFK time per player

  //Low Priority

  //@TODO average entities over last 7 hours
  //@TODO average chunks over last 7 hours
  //@TODO discordSRV percentage of minecraft players with linked accounts
  //@TODO total claimed area
  //@TODO average first session length

  //Other shit that needs to be done

  //@TODO Dynmap Wrapper
  //@TODO Rewrite player api
  //@TODO Graph generator
}

//@TODO finish death and kd leaderboards
type LeaderboardType = "playtime" | "mobkills" | "playerkills" | "deaths" | "kd";
