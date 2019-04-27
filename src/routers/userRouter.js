// User Router.js
import express from "express";
import routes from "../routes";
import { onlyPrivate } from "../middlewares";
import { getEditProfile } from "../controlers/userController";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);

export default userRouter;
