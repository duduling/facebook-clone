// Global Router.js
import express from "express";
import routes from "../routes";
import {
  getFeedMain,
  getFeedUser,
  postFeedsUpload,
  getFeedSearch
} from "../controlers/feedController";
import { onlyPrivate, uploadFeed } from "../middlewares";

const feedRouter = express.Router();

feedRouter.get(routes.feedsMain, onlyPrivate, getFeedMain);
feedRouter.get(routes.feedsSearch, onlyPrivate, getFeedSearch);
feedRouter.post(routes.feedsUpload, onlyPrivate, uploadFeed, postFeedsUpload);

feedRouter.get(routes.feedsUser(), onlyPrivate, getFeedUser);

export default feedRouter;
