// Global Router.js
import express from "express";
import routes from "../routes";
import { getFeedMain } from "../controlers/feedController";

const feedRouter = express.Router();

feedRouter.get(routes.feedsMain, getFeedMain);

export default feedRouter;
