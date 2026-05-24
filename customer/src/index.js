import express from "express";
import { databaseConnection } from "./database/index.js";
const app = express();
const port = 8001;

const StartServer = async () => {
  await databaseConnection();

  app.get("/", (req, res) => res.send("Hello Customer!"));

  app
    .listen(port, () => console.log(`Customer listening on port ${port}!`))
    .on("error", (err) => {
      console.error("Error starting server:", err);
      process.exit(1);
    })
    .on("close", () => {
      console.log("Server closed");
    });
};

StartServer();
