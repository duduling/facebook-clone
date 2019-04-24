// Global Router.js
import express from "express";
import routes from "../routes";
import {
  getHome,
  postLogin,
  postJoin,
  middlewareLogout
} from "../controlers/globalController";

const globalRouter = express.Router();

globalRouter.get(routes.home, middlewareLogout, getHome);
globalRouter.post(routes.join, postJoin, postLogin);
globalRouter.post(routes.login, postLogin);

export default globalRouter;
