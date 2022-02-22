import express from "express";
import path from "path";
import ImageGen from "./modules/imageGen";
import Map from "./modules/map";

import mmApi from "./website/routers/api-mm";

const App = express();

App.use("/api", mmApi);

App.get("/", (req, res) => {
    res.sendFile(path.resolve(`./website/assets/pages/index.html`));
});

App.get("/assets/:type/:file", (req, res) => {
  res.sendFile(path.resolve(`./website/assets/${req.params.type}/${req.params.file}`));
})

App.listen(3000, () => {
  console.log("Server is running on port 3000\nhttp://localhost:3000");
});