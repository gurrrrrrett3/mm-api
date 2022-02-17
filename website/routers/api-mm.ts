import { Router } from "express";
import path from "path";
import mmInterface from "../../modules/interface";
import { mmFetchSessionsReturn } from "../../modules/types";

import playerRouter from "./mmPlayer";
import lbRouter from "./mmLb";

const router = Router();

router.use("/player", playerRouter);
router.use("/lb", lbRouter);

router.get("/", async (req, res) => {
  res.sendFile(path.resolve(`./assets/groups/mm/html/index.html`));
});

router.get("/onlinelist", async (req, res) => {
  const data = await mmInterface.getOnlineSessons();
  let sendData: string[] = [];
  data.forEach((session) => {
    sendData.push(session.name);
  });

  res.send(sendData);
});


export default router;
