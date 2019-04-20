// app.js

// Imports
import bodyParser from "body-parser";
import morgan from "morgan";
import express from "express";
import helmet from "helmet";
import path from "path";
import routes from "./routes";

// Import Routers
import globalRouter from "./routers/globalRouter";
import { localsMiddleware } from "./middlewares";

const app = express();

app.use(helmet());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middle Wares
app.use(localsMiddleware);

// Route
app.get(routes.home, globalRouter);

export default app;
