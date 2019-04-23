// app.js

// Imports
import bodyParser from "body-parser";
import morgan from "morgan";
import express from "express";
import helmet from "helmet";
import path from "path";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
import routes from "./routes";

// Import Routers
import globalRouter from "./routers/globalRouter";
import feedRouter from "./routers/feedRouter";
import { localsMiddleware } from "./middlewares";

import "./passport";
import apiRouter from "./routers/apiRouter";

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 // 유효기간 1시간
    }
  })
);
app.use(flash());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(morgan("dev"));

// passport reset
app.use(passport.initialize());
app.use(passport.session());

// Middle Wares
app.use(localsMiddleware);

// Route
app.use(routes.home, globalRouter);
app.use(routes.feeds, feedRouter);
app.use(routes.api, apiRouter);

export default app;
