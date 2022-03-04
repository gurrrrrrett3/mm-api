/*
  @TYPES FILE
  
  This file contains all the types used in the application.
  It's used as "Templates" for data types to keep them consistent.
  I generated them with actual data from the plan API

*/

export type mmFetchOptions =
  | mmFetchOverview
  | mmFetchSessionsOverview
  | mmFetchPlayerbaseOverview
  | mmFetchSessions
  | mmFetchGraph
  | mmFetchPingTable
  | mmFetchServers
  | mmFetchPlayer
  | mmFetchPlayers;
export type mmFetchReturn =
  | mmFetchOverviewReturn
  | mmFetchSessionsOverviewReturn
  | mmFetchPlayerbaseOverviewReturn
  | mmFetchSessionsReturn
  | mmFetchGraphReturn
  | mmFetchPingTableReturn
  | mmFetchServersReturn
  | mmFetchPlayerReturn
  | mmFetchPlayersReturn;

export interface mmFetchOverview {
  endpoint: "overview";
  timestamp: number;
}

export interface mmFetchSessionsOverview {
  endpoint: "sessionsOverview";
  timestamp: number;
}

export interface mmFetchPlayerbaseOverview {
  endpoint: "playerbaseOverview";
  timestamp: number;
}

export interface mmFetchSessions {
  endpoint: "sessions";
  timestamp: number;
}

export interface mmFetchPingTable {
  endpoint: "pingTable";
  timestamp: number;
}

export interface mmFetchServers {
  endpoint: "servers";
  timestamp: number;
}

export interface mmFetchPlayer {
  endpoint: "player";
  player: string;
}

export interface mmFetchPlayers {
  endpoint: "players";
  timestamp: number;
}

export interface mmFetchOverviewReturn {
  timestamp: number;
  timestamp_f: string;
  weeks: Weeks;
  players: Players;
  numbers: Numbers;
}

export interface Numbers {
  sessions: number;
  regular_players: number;
  session_length_avg: string;
  best_peak_players: string;
  player_playtime: string;
  current_uptime: string;
  last_peak_players: string;
  best_peak_date: string;
  total_players: number;
  playtime: string;
  last_peak_date: string;
  online_players: number;
}

export interface Players {
  new_players_7d: number;
  new_players_1d: number;
  unique_players_1d: number;
  new_players_30d: number;
  unique_players_30d: number;
  unique_players_7d: number;
}

export interface Weeks {
  session_length_average_trend: Sessionlengthaveragetrend;
  unique_after: number;
  sessions_after: number;
  new_trend: Sessionlengthaveragetrend;
  average_playtime_after: string;
  regular_after: number;
  start: string;
  average_playtime_before: string;
  regular_before: number;
  session_length_average_before: string;
  sessions_trend: Sessionlengthaveragetrend;
  unique_trend: Sessionlengthaveragetrend;
  session_length_average_after: string;
  regular_trend: Sessionlengthaveragetrend;
  average_playtime_trend: Sessionlengthaveragetrend;
  midpoint: string;
  sessions_before: number;
  end: string;
  new_before: number;
  new_after: number;
  unique_before: number;
}

export interface Sessionlengthaveragetrend {
  text: string;
  direction: direction;
  reversed: boolean;
}

export interface mmFetchServersReturn {
  timestamp: number;
  timestamp_f: string;
  servers: Server[];
}

export interface Server {
  playersOnline: number[][];
  new_players: number;
  best_peak_players: number;
  players: number;
  unique_players: number;
  last_peak_date: string;
  downtime: string;
  current_uptime: string;
  name: string;
  best_peak_date: string;
  last_peak_players: number;
  online: number;
  avg_tps: string;
  low_tps_spikes: number;
}

export interface mmFetchSessionsOverviewReturn {
  timestamp: number;
  timestamp_f: string;
  insights: {
    afk_time: string;
    total_playtime: string;
    afk_time_perc: string;
  };
}

export interface mmFetchPlayerbaseOverviewReturn {
  timestamp: number;
  timestamp_f: string;
  insights: Insights;
  trends: Trends;
}

export interface Trends {
  regular_players_trend: Newtoregulartrend;
  playtime_avg_now: string;
  regular_afk_avg_trend: Newtoregulartrend;
  afk_then: string;
  regular_playtime_avg_then: string;
  afk_now: string;
  total_players_now: number;
  regular_session_avg_now: string;
  total_players_trend: Newtoregulartrend;
  afk_trend: Newtoregulartrend;
  regular_session_avg_trend: Newtoregulartrend;
  regular_players_now: number;
  playtime_avg_trend: Newtoregulartrend;
  regular_session_avg_then: string;
  regular_players_then: number;
  regular_playtime_avg_now: string;
  regular_afk_avg_now: string;
  playtime_avg_then: string;
  regular_playtime_avg_trend: Newtoregulartrend;
  total_players_then: number;
  regular_afk_avg_then: string;
}

export interface Insights {
  new_to_regular_trend: Newtoregulartrend;
  new_to_regular: number;
  regular_to_inactive: number;
  regular_to_inactive_trend: Newtoregulartrend;
}

export interface Newtoregulartrend {
  text: string;
  direction: direction;
  reversed: boolean;
}

export interface mmFetchSessionsReturn {
  timestamp: number;
  timestamp_f: string;
  sessions: Session[];
}

export interface mmFetchServersReturnServer {
  avg_tps: string;
  best_peak_date: string;
  best_peak_players: number;
  current_uptime: string;
  downtime: string;
  last_peak_date: string;
  last_peak_players: number;
  low_tps_spikes: number;
  name: string;
  new_players: number;
  online: number;
  players: number;
  unique_players: number;
  players_online: [number, number][];
}

export interface RootObject {
  timestamp: number;
  timestamp_f: string;
  sessions: Session[];
}

export interface Session {
  server_name: string;
  start: string;
  length: string;
  gm_series: Gmsery[];
  player_uuid: string;
  most_used_world: string;
  first_session: boolean;
  mob_kills: number;
  player_url_name: string;
  afk_time: string;
  name: string;
  player_kills: Playerkill[];
  network_server: string;
  end: string;
  player_name: string;
  world_series: Worldsery[];
  server_url_name: string;
  server_uuid: string;
  deaths: number;
}

export interface Worldsery {
  name: string;
  y: number;
  color: string;
  drilldown: string;
}

export interface Gmsery {
  data: (number | string)[][];
  name: string;
  id: string;
}

export interface mmFetchServersReturn {
  timestamp: number;
  timestamp_f: string;
  playersOnline: number[][];
  color: string;
}

export interface mmFetchGraphReturn extends ANY {
  timestamp: number;
  timestamp_f: string;
  serverUUID: {
    uuid: string;
  },
  keys: string[];
  values: number[][];
}

export interface mmFetchPingTableReturn {
  timestamp: number;
  timestamp_f: string;
  table: Table[];
}

export interface mmFetchPlayerReturn {
    kill_data: Killdata;
    sessions: Session[];
    calendar_series: Calendarsery[];
    player_deaths: Playerkill[];
    gm_series: Gmsery[];
    world_pie_series: Worldsery[];
    server_pie_colors: string[];
    servers: Server[];
    server_pie_series: Serverpiesery[];
    online_activity: Onlineactivity;
    player_kills: Playerkill[];
    sessions_per_page: number;
    punchcard_series: Punchcardsery[];
    nicknames: Nickname[];
    connections: Connection[];
    info: Info;
    first_day: number;
  }

  export interface mmFetchPlayersReturn {
    timestamp: number;
    timestamp_f: string;
    data: Datum[];
    columns: Column[];
  }
  
  interface Column {
    data: Datum2 | string;
    title: string;
  }
  
  interface Datum2 {
    display: string;
    _: string;
  }
  
  export interface Datum {
    sessions: string;
    name: string;
    activePlaytime: ActivePlaytime;
    index: ActivePlaytime;
    registered: ActivePlaytime;
    permissionGroups: ActivePlaytime;
    protocolVersion: ActivePlaytime;
    seen: ActivePlaytime;
    primaryGroup: ActivePlaytime;
    geolocation: string;
    group: ActivePlaytime;
    username: ActivePlaytime;
  }
  
  interface ActivePlaytime {
    d: string;
    v: string;
  }

  
  interface Info {
    kick_count: number;
    last_seen: string;
    favorite_server: string;
    mob_kill_count: number;
    player_kill_count: number;
    registered: string;
    activity_index_group: string;
    playtime: string;
    session_median: string;
    active_playtime: string;
    operator: boolean;
    afk_time: string;
    death_count: number;
    worst_ping: string;
    session_count: number;
    online: boolean;
    longest_session_length: string;
    best_ping: string;
    banned: boolean;
    activity_index: string;
    average_ping: string;
  }
  
  interface Connection {
    geolocation: string;
    date: string;
  }
  
  interface Nickname {
    nickname: string;
    server: string;
    date: string;
  }
  
  interface Punchcardsery {
    x: number;
    y: number;
    z: number;
    marker: Marker;
  }
  
  interface Marker {
    radius: number;
  }
  
  interface Onlineactivity {
    session_count_30d: number;
    session_count_7d: number;
    afk_time_7d: string;
    mob_kill_count_30d: number;
    active_playtime_7d: string;
    mob_kill_count_7d: number;
    afk_time_30d: string;
    average_session_length_30d: string;
    death_count_30d: number;
    active_playtime_30d: string;
    average_session_length_7d: string;
    median_session_length_7d: string;
    median_session_length_30d: string;
    playtime_30d: string;
    player_kill_count_30d: number;
    death_count_7d: number;
    playtime_7d: string;
    player_kill_count_7d: number;
  }
  
  interface Serverpiesery {
    name: string;
    y: number;
  }
  
  export interface Server {
    server_name: string;
    last_seen: string;
    registered: string;
    gm_series: Gmsery[];
    playtime: string;
    session_median: string;
    world_pie_series: Worldsery[];
    operator: boolean;
    mob_kills: number;
    afk_time: string;
    session_count: number;
    player_kills: number;
    longest_session_length: string;
    banned: boolean;
    deaths: number;
  }
  
  export interface Calendarsery {
    title: string;
    start: number | string;
    color?: string;
    end?: number;
  }
  
  export interface Playerkill {
    date: string;
    weapon: string;
    victimUUID: string;
    serverUUID: string;
    victimName: string;
    serverName: string;
    victim: string;
    killer: string;
    killerUUID: string;
    killerName: string;
  }
  
  interface Killdata {
    deaths_7d: number;
    mob_deaths_7d: number;
    mob_kills_total: number;
    player_kdr_30d: string;
    player_kills_7d: number;
    player_deaths_total: number;
    deaths_30d: number;
    deaths_total: number;
    player_kills_total: number;
    mob_deaths_30d: number;
    player_deaths_30d: number;
    mob_kdr_30d: string;
    player_kdr_total: string;
    weapon_3rd: string;
    mob_kdr_7d: string;
    player_kdr_7d: string;
    player_kills_30d: number;
    weapon_2nd: string;
    player_deaths_7d: number;
    mob_deaths_total: number;
    mob_kills_7d: number;
    mob_kdr_total: string;
    weapon_1st: string;
    mob_kills_30d: number;
  }

interface Table {
  country: string;
  avg_ping: string;
  max_ping: string;
  min_ping: string;
}
export type mmFetchGraph = mmFetchGraphServer | mmFetchGraphNonServer;

export interface mmFetchGraphServer {
  endpoint: "graph";
  timestamp: number;
  type: mmFetchGraphServerTypes;
  server: string;
}

export interface mmFetchGraphNonServer {
  endpoint: "graph";
  timestamp: number;
  type: mmFetchGraphTypes;
}

export type mmFetchGraphTypes =
  | "uniqueAndNew"
  | "hourlyUniqueAndNew"
  | "serverPie"
  | "joinAddressPie"
  | "activity"
  | "geolocation";
export type mmFetchGraphServerTypes = "optimizedPerformance" | "playersOnline" | " aggregatedPing";

export type direction = "+" | "-";

export interface ANY {
  [key: string]: any;
}


//Map

export interface mmFetchMapTile {
  endpoint: "tile";
  world: string;
  x: number;
  z: number;
  zoom: number;
}

export interface mmFetchMapPlayersReturn {
  max: number;
  players: Player[];
}

export interface Player {
  world: string;
  armor: number;
  name: string;
  x: number;
  health: number;
  z: number;
  display_name: string;
  uuid: string;
  yaw: number;
}

