// app.js

// Imports
import bodyParser from "body-parser";
import morgan from "morgan";
import express from "express";
import helmet from "helmet";
import path from "path";
import passport from "passport";
import localStrategy from "passport-local";
import cookieSession from "cookie-session";
import flash from "connect-flash";
import routes from "./routes";

// Import Routers
import globalRouter from "./routers/globalRouter";
import feedRouter from "./routers/feedRouter";
import { localsMiddleware } from "./middlewares";

const app = express();

app.use(helmet());
app.use(
  cookieSession({
    keys: ["sid"],
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 // 유효기간 1시간
    }
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middle Wares
app.use(localsMiddleware);

// Route
app.use(routes.home, globalRouter);
app.use(routes.feeds, feedRouter);

export default app;
