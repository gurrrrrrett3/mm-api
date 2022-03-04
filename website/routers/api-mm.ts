import { Router } from "express";
import path from "path";
import mmInterface from "../../modules/interface";
import { mmFetchSessionsReturn } from "../../modules/types";

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
export default router;
