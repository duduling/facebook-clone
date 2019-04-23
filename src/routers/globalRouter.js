// Global Router.js
import express from "express";
import passport from "passport";

import routes from "../routes";
import { getHome, postLogin, postJoin } from "../controlers/globalController";

const globalRouter = express.Router();

globalRouter.get(routes.home, getHome);
globalRouter.post(routes.join, postJoin);
globalRouter.post(
  routes.login,
  passport.authenticate("local", {
    successRedirect: `/feeds${routes.feedsMain}`,
    failureRedirect: routes.home
  }),
  postLogin
);

export default globalRouter;
