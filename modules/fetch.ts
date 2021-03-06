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
import { Cache } from "./interface";
import config from "../config.json";

const apiUrl = config.baseUrl

export default class mmApi {
  /**
   * A wrapper for fetch that generates the url, and handles errors
   * @param options options for the request
   */
  public static async fetch(options: mmFetchOptions) {
    //Convert the options to an endpoint and query
    const endpoint = this.genEndpoint(options);
    const query = this.genQuery(options);
    const url = `${apiUrl}${endpoint}${query}`;

    //Save current timestamp to get the time it took to fetch
    const start = Date.now();

    //Send the request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `auth=${Cache.loadLoginData()}`,
      }
    }).catch((err) => {
      this.handleFetchError(err, url);
    });
    if (!response)
      return {
        error: true,
        message: "Failed to fetch data",
      }

      //Convert the response to JSON so that I can parse it
    const data = await response.json().catch((err) => {
      this.handleFetchError(err, url);
      return {
        error: true,
        message: "Failed to parse data as JSON",
        err,
      };
    });
    //console.log(`Fetched ${url} in ${Date.now() - start}ms`);
    return this.dataTyper(data, options);
  }

  /**
   * A utility function to generate the endpoint for the request based on the options
   * @param options 
   * @returns 
   */
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

  /**
   * Creates the query string for the request based on the options
   * @param options 
   * @returns 
   */
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

  /**
   * A utility function to add typings to the data returned from the API
   * @param data data returned from the API
   * @param options options for the request
   * @returns data typed as the correct type
   */
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

  /**
   * Error handling for fetch
   * @param err 
   * @param url 
   */
  private static handleFetchError(err: any, url: string) {
    console.log(`Failed to fetch ${url}`);
  }
}
