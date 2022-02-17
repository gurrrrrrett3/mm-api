const lists = {
    players: document.getElementById("pl-content "),
    playtime: document.getElementById("pt-content "),
    mobkills: document.getElementById("mk-content "),
    playerkills: document.getElementById("pk-content "),
};

let totalFetched = 0;

async function getData() {
    totalFetched = 0;
    document.getElementById("refresh ").innerText = "Refreshing...";


    (await fetch("/api/mm/onlinelist")).json().then((online) => {
        removeAllChildren(lists.players);
        createList(lists.players, online);
        addToCounter()
    });

    (await fetch("/api/mm/lb/playtime")).json().then((playtime) => {
        removeAllChildren(lists.playtime);
        let playtimeList = [];
        playtime.forEach(function(item) {
            playtimeList.push(`${item.name} | ${item.f_playtime}`);
        });
        createList(lists.playtime, playtimeList);
        addToCounter()
    });

    (await fetch("/api/mm/lb/mobkills")).json().then((mobkills) => {
        removeAllChildren(lists.mobkills);
        let mobkillsList = [];
        mobkills.forEach(function(item) {
            mobkillsList.push(`${item.name} | ${formatNumber(item.mobKills)}`);
        });
        createList(lists.mobkills, mobkillsList);
        addToCounter()
    });

    (await fetch("/api/mm/lb/kills")).json().then((playerkills) => {
        removeAllChildren(lists.playerkills);
        let playerkillsList = [];
        playerkills.forEach(function(item) {
            playerkillsList.push(`${item.name} | ${formatNumber(item.playerKills)}`);
        });
        createList(lists.playerkills, playerkillsList);
        addToCounter()
    });


}

function createList(element, data) {
    data.forEach(function(item) {
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = item;
        element.appendChild(li);
    });
}

function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function addToCounter() {
    totalFetched++;
    if (totalFetched === 4) {
        document.getElementById("refresh ").innerText = "Refresh";
    }
}

document.addEventListener("load", getData());