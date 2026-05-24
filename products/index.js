import express from "express";
const app = express();
const port = 8002;

app.get("/", (req, res) => res.send("Hello Products!"));

app.listen(port, () => console.log(`Products listening on port ${port}!`));
