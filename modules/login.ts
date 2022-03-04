import fetch from "node-fetch";
import config from "../config.json";
import { Cache } from "./interface";
export default async function login(auth: { username: string; password: string }) {
  //Send the login api request
  try {
    const formData = new URLSearchParams();

    formData.append("user", auth.username);
    formData.append("password", auth.password);

    console.log(`Logging in as ${auth.username}...`);

    //Send a POST request to the login endpoint
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
      //Extract the cookie from the response, and save it to the cache
      const token = res.headers.get("set-cookie")?.split(";")[0].replace("auth=", "");
      if (!token) {
        console.log("Login failed");
        process.exit(1);
      }
      Cache.saveLoginData(token);
      console.log(`Login successful, token: ${token}`);
    });
  } catch (error) {
    console.log(error);
  }
}
