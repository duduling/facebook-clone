// Global Router.js
import express from "express";
import routes from "../routes";
import { getHome, postLogin, postJoin } from "../controlers/globalController";

const globalRouter = express.Router();

globalRouter.get(routes.home, getHome);
globalRouter.post(routes.join, postJoin);
globalRouter.post(routes.login, postLogin);

export default globalRouter;
