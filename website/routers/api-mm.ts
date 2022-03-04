import { Router } from "express";
import path from "path";
import mmInterface from "../../modules/interface";
import config from "../../config.json";

import playerRouter from "./mmPlayer";
import lbRouter from "./mmLb";

const router = Router();

router.use("/player", playerRouter);
router.use("/lb", lbRouter);


router.get("/onlinelist", async (req, res) => {
  const data = await mmInterface.getOnlineSessons();
  let sendData: string[] = [];
  data.forEach((session) => {
    sendData.push(session.name);
  });

  res.send(sendData);
});

router.get("/onlinelist/:server", async (req, res) => {
  const server = req.params.server;
  if (server === "survival" || server === "lobby") {
    const data = await mmInterface.getOnlineSessionsPerServer(server);
    res.send(data);
  } else {
    res.send("Invalid server");
  }
});

router.get("/rank/count", async (req, res) => {
  res.send(await mmInterface.getRankCounts());
})

router.get("/rank/format", (req, res) => {
  res.send(config.ranks)
})

router.get("/tps", async (req, res) => {
  res.send({
    survival: await mmInterface.getCurrentTPS("survival"),
    lobby: await mmInterface.getCurrentTPS("lobby")
  });
})

router.get("/uptime", async (req, res) => {
  let uptime = await mmInterface.getUptime();
  res.send({
    survival: uptime.survival,
    lobby: uptime.lobby
  });
})


router.get("/graph/:type", (req, res) => {
  res.sendFile(path.resolve(`./website/assets/pages/graph.html`));

})


router.get("/graph/data/:type", async (req, res) => {
  let type = req.params.type;
  //@ts-expect-error
  let data = await mmInterface.getGraphData(type);
  res.send(data);
})

export default router;
