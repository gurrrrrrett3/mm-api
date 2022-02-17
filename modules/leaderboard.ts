import mmApi from "./fetch";
import { mmFetchPlayersReturn } from "./types";
import parse from "node-html-parser";
import mmInterface from "./interface";

type Stat = "total" | "week" | "month";

export default class mmLeaderboard {
  public static async playtime(stat: Stat) {
    const data = (await mmApi.fetch({
      endpoint: "players",
      timestamp: Date.now(),
    })) as mmFetchPlayersReturn;

    let out: PlaytimeLeaderboardItem[] = [];

    data.data.forEach(async (player) => {
      const playername = parse(player.name).childNodes[0].rawText;
      const playerData = mmInterface.getPlayer(playername);

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

  public static async mobKills(stat: Stat) {
    const data = (await mmApi.fetch({
      endpoint: "players",
      timestamp: Date.now(),
    })) as mmFetchPlayersReturn;

    let out: MobKillsLeaderboardItem[] = [];

    data.data.forEach(async (player) => {
      const playername = parse(player.name).childNodes[0].rawText;
      const playerData = mmInterface.getPlayer(playername);

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

  public static async playerKills(stat: Stat) {
    const data = mmInterface.getPlayers();

    let out: PlayerKillsLeaderboardItem[] = [];

    data.data.forEach(async (player) => {
      const playername = parse(player.name).childNodes[0].rawText;
      const playerData = mmInterface.getPlayer(playername);

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