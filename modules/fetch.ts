import fetch from "node-fetch";
import {
  mmFetchOptions,
  mmFetchGraphReturn,
  mmFetchOverviewReturn,
  mmFetchPingTableReturn,
  mmFetchPlayerbaseOverviewReturn,
  mmFetchPlayerReturn,
  mmFetchReturn,
  mmFetchServersReturn,
  mmFetchSessionsOverviewReturn,
  mmFetchSessionsReturn,
  mmFetchPlayersReturn,
} from "./types";
import config from "../conifg.json";

const apiUrl = config.baseUrl

export default class mmApi {
  public static async fetch(options: mmFetchOptions) {
    const endpoint = this.genEndpoint(options);
    const query = this.genQuery(options);
    const url = `${apiUrl}${endpoint}${query}`;
    const response = await fetch(url).catch((err) => {
      this.handleFetchError(err, url);
    });
    if (!response)
      return {
        error: true,
        message: "Failed to fetch data",
      };
    const data = await response.json().catch((err) => {
      this.handleFetchError(err, url);
      return {
        error: true,
        message: "Failed to parse data as JSON",
        err,
      };
    });
    console.log(url);
    return this.dataTyper(data, options);
  }

  private static genEndpoint(options: mmFetchOptions) {
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

  private static genQuery(options: mmFetchOptions) {
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

  private static dataTyper(data: mmFetchReturn, options: mmFetchOptions) {
    switch (options.endpoint) {
      case "overview":
        return data as mmFetchOverviewReturn;
      case "sessionsOverview":
        return data as mmFetchSessionsOverviewReturn;
      case "playerbaseOverview":
        return data as mmFetchPlayerbaseOverviewReturn;
      case "sessions":
        return data as mmFetchSessionsReturn;
      case "pingTable":
        return data as mmFetchPingTableReturn;
      case "servers":
        return data as mmFetchServersReturn;
      case "graph":
        return data as mmFetchGraphReturn;
      case "player":
        return data as mmFetchPlayerReturn;
      case "players":
        return data as mmFetchPlayersReturn;
    }
  }

  private static handleFetchError(err: any, url: string) {
    console.log(`Failed to fetch ${url}`);
  }
}
