// Global Router.js
import express from "express";
import routes from "../routes";
import { getHome } from "../controlers/globalController";

const globalRouter = express.Router();

globalRouter.get(routes.home, getHome);

export default globalRouter;
