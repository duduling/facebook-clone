// Global Router.js
import express from "express";
import routes from "../routes";
import { getFeedMain } from "../controlers/feedController";
import { onlyPrivate } from "../middlewares";

const feedRouter = express.Router();

feedRouter.get(routes.feedsMain, onlyPrivate, getFeedMain);

export default feedRouter;
