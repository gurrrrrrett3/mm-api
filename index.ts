import express from "express";
import path from "path";
import ImageGen from "./modules/imageGen";
import Map from "./modules/map";

import mmApi from "./website/routers/api-mm";

const App = express();

App.use("/api", mmApi);
App.use("/assets", express.static(path.join(__dirname, "website/assets")));

App.get("/", (req, res) => {
    res.sendFile(path.resolve(`./website/assets/pages/index.html`));
});

App.listen(3000, () => {
  console.log("Server is running on port 3000\nhttp://localhost:3000");
});

(async () => {
console.log(await ImageGen.getPlayerSnapshot("Dylanemon"));
})();