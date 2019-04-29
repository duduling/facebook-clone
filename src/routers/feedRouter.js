// Global Router.js
import express from "express";
import routes from "../routes";
import {
  getFeedMain,
  getFeedUser,
  getFeedSearch
} from "../controlers/feedController";
import { onlyPrivate } from "../middlewares";

const feedRouter = express.Router();

feedRouter.get(routes.feedsMain, onlyPrivate, getFeedMain);
feedRouter.get(routes.feedsSearch, onlyPrivate, getFeedSearch);
feedRouter.get(routes.feedsUser(), onlyPrivate, getFeedUser);

export default feedRouter;
