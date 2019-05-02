// User Router.js
import express from "express";
import routes from "../routes";
import { onlyPrivate } from "../middlewares";
import {
  getEditProfile,
  getEditPassword,
  getuserFriends,
  postEditPassword
} from "../controlers/userController";

const userRouter = express.Router();

userRouter.get(routes.userFriends, onlyPrivate, getuserFriends);
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.get(routes.editPassword, onlyPrivate, getEditPassword);
userRouter.post(routes.editPassword, onlyPrivate, postEditPassword);

export default userRouter;
