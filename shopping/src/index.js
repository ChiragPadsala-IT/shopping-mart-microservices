import express from "express";
const app = express();
const port = 8001;

app.get("/", (req, res) => res.send("Hello Customer!"));

app.listen(port, () => console.log(`Customer listening on port ${port}!`));
