import express from "express";
import proxy from "express-http-proxy";
import cors from "cors";

const app = express();
app.use(cors());
const port = 8000;

app.use("/customer", proxy("http://localhost:8001"));
app.use("/shopping", proxy("http://localhost:8003"));
app.use("/", proxy("http://localhost:8002"));

app.listen(port, () => console.log(`Gateway listening on port ${port}!`));
