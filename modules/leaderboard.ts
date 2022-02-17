import mmApi from "./fetch";
import { mmFetchPlayersReturn } from "./types";
import parse from "node-html-parser";
import mmInterface from "./interface";

//Timeframes to get data for
type Stat = "total" | "week" | "month";

export default class mmLeaderboard {

  //Generates a leaderboard of the top 10 players sorted by playtime
  public static async playtime(stat: Stat) {

    //Get the full player data file
    const data = (await mmApi.fetch({
      endpoint: "players",
      timestamp: Date.now(),
    })) as mmFetchPlayersReturn;

    let out: PlaytimeLeaderboardItem[] = [];

    //For each player, get their playtime
    data.data.forEach(async (player) => {
      const playername = parse(player.name).childNodes[0].rawText;
      const playerData = mmInterface.getPlayer(playername);

      //Select the correct data value to use based on the timeframe
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
      //Format a json object to send to the client
      out.push({
        name: playername,
        playtime: mmInterface.formatPlanDate(f_playtime),
        f_playtime,
      });
    });

    out.sort((a, b) => {
      return b.playtime - a.playtime;
    });
    return out.slice(0, 10);
  }

  //Generates a leaderboard of the top 10 players sorted by mob kills
  public static async mobKills(stat: Stat) {
    //Get the full player data file
    const data = (await mmApi.fetch({
      endpoint: "players",
      timestamp: Date.now(),
    })) as mmFetchPlayersReturn;

    let out: MobKillsLeaderboardItem[] = [];

    //For each player, get their mob kills
    data.data.forEach(async (player) => {
      const playername = parse(player.name).childNodes[0].rawText;
      const playerData = mmInterface.getPlayer(playername);

      //Select the correct data value to use based on the timeframe
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
      //Format a json object to send to the client
      out.push({
        name: playername,
        mobKills,
      });
    });

    out.sort((a, b) => {
      return b.mobKills - a.mobKills;
    });
    return out.slice(0, 10);
  }

  //Generates a leaderboard of the top 10 players sorted by total deaths
  public static async playerKills(stat: Stat) {
    const data = mmInterface.getPlayers();

    let out: PlayerKillsLeaderboardItem[] = [];

    //For each player, get their total player kills
    data.data.forEach(async (player) => {
      const playername = parse(player.name).childNodes[0].rawText;
      const playerData = mmInterface.getPlayer(playername);

      //Select the correct data value to use based on the timeframe
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
      //Format a json object to send to the client
      out.push({
        name: playername,
        playerKills,
      });
    });

    out.sort((a, b) => {
      return b.playerKills - a.playerKills;
    });
    return out.slice(0, 10);
  }
}

interface PlaytimeLeaderboardItem {
  name: string;
  playtime: number;
  f_playtime: string;
}

interface MobKillsLeaderboardItem {
  name: string;
  mobKills: number;
}

interface PlayerKillsLeaderboardItem {
  name: string;
  playerKills: number;
}