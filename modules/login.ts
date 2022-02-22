import fetch from "node-fetch";
import config from "../config.json";
import { Cache } from "./interface";
export default async function login(auth: { username: string; password: string }) {
  //Send the login api request
  try {
    const formData = new URLSearchParams();

    formData.append("user", auth.username);
    formData.append("password", auth.password);

    fetch(config.loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        referer: "https://analytics.metamechanists.org/login",
      },
      body: formData,
    }).then((res) => {
      if (!res || !res.headers.get("set-cookie") || !res.ok) {
        console.log("Login failed");
        process.exit(1);
      }

      const token = res.headers.get("set-cookie")?.split(";")[0].replace("auth=", "");
      if (!token) {
        console.log("Login failed");
        process.exit(1);
      }
      Cache.saveLoginData(token);
    });
  } catch (error) {
    console.log(error);
  }
}
