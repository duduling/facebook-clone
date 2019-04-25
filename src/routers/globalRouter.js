// Global Router.js
import express from "express";
import routes from "../routes";
import {
  getHome,
  postLogin,
  postJoin,
  logout
} from "../controlers/globalController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, onlyPublic, getHome);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);
globalRouter.get(routes.logout, onlyPrivate, logout);

export default globalRouter;
