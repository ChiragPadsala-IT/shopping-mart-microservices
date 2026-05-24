import express from "express";
const app = express();
const port = 8003;

app.get("/", (req, res) => res.send("Hello Shopping!"));

app.listen(port, () => console.log(`Shopping listening on port ${port}!`));
