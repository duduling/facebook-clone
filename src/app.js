// app.js

import bodyParser from "body-parser";
import morgan from "morgan";
import express from "express";
import helmet from "helmet";
import path from "path";
import routes from "./routes";

// Router
import globalRouter from "./routers/globalRouter";

const app = express();

app.use(helmet());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));
console.log(path.join(__dirname, "static"));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get(routes.home, globalRouter);

export default app;
