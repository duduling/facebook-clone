// User Router.js
import express from "express";
import routes from "../routes";
import { onlyPrivate } from "../middlewares";
import {
  getEditProfile,
  getEditPassword,
  getuserFriends
} from "../controlers/userController";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.get(routes.editPassword, onlyPrivate, getEditPassword);
userRouter.get(routes.userFriends, onlyPrivate, getuserFriends);

export default userRouter;
