const path = window.location.pathname;
const playerName = path.split("/")[path.split("/").length - 1];
document.addEventListener("load", getData());
let data = {};

function getData() {
  document.getElementById("title").innerText = `${playerName}'s Stats`;
  document.getElementById("header").innerText = `${playerName}'s Stats`;
  document.getElementById("player-head").src = `https://mc-heads.net/avatar/${playerName}/128`;
  console.log(playerName);

  fetch(`/api/player/${playerName}`).then(async function (response) {
    response.json().then(function (player) {
      data = JSON.stringify(player);
      
      //Player Stats
      const stats = document.getElementById("player-stats");
      removeAllChildren(stats);
      let statList = []
        
        statList.push(player.info.online ? `Currently Online` : `Last Seen: ${player.info.last_seen}`);
        statList.push(`Favorite Server: ${player.info.favorite_server}`);
        statList.push(`Average Ping: ${player.info.average_ping}`);
        statList.push(`Playtime: ${player.info.playtime}`);
        statList.push(`Active Playtime: ${player.info.active_playtime}`);
        statList.push(`AFK Time: ${player.info.afk_time}`);
        statList.push(`Activity Index: ${player.info.activity_index} (${player.info.activity_index_group})`);
        statList.push(`First Join: ${player.info.registered}`);

        makeList(stats, statList);

        const info = document.getElementById("player-info");
        removeAllChildren(info);
        let infoList = []
        
        infoList.push(`Name: ${playerName}`);
        infoList.push(`Total Deaths: ${player.kill_data.deaths_total}`)
        infoList.push(`Deaths - 30 Days: ${player.kill_data.deaths_30d}`)
        infoList.push(`Deaths - 7 Days: ${player.kill_data.deaths_7d}`)
        infoList.push(`Mob Kills: ${player.kill_data.mob_kills_total}`)
        infoList.push(`Mob Kills - 30 Days: ${player.kill_data.mob_kills_30d}`)
        infoList.push(`Mob Kills - 7 Days: ${player.kill_data.mob_kills_7d}`)
        infoList.push(`Player Kills: ${player.kill_data.player_kills_total}`)
        infoList.push(`Player Kills - 30 Days: ${player.kill_data.player_kills_30d}`)
        infoList.push(`Player Kills - 7 Days: ${player.kill_data.player_kills_7d}`)
        infoList.push(`Player k/d: ${player.kill_data.player_kdr_total}`)
        infoList.push(`Mob k/d: ${player.kill_data.mob_kdr_total}`)
        infoList.push(`1st Favorite Weapon: ${player.kill_data.weapon_1st}`)
        infoList.push(`2nd Favorite Weapon: ${player.kill_data.weapon_2nd}`)
        infoList.push(`3rd Favorite Weapon: ${player.kill_data.weapon_3rd}`)

        makeList(info, infoList);
    });
  });
}

function makeList(element, data) {
  data.forEach(function (item) {
    let container = document.createElement("div");
    container.classList.add("container");
    let li = document.createElement("li");
    li.className = "list-group-item li-hover";
    li.innerText = item
    container.appendChild(li);
    element.appendChild(container);
  });
}

function removeAllChildren(element) {
    while (element.firstChild) {
        if (!element.class) return
        if (element.class.includes("keep-child")) return
      element.removeChild(element.firstChild);
    }
  }
  