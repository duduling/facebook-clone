// User Router.js
import express from "express";
import routes from "../routes";
import { onlyPrivate, uploadProfile } from "../middlewares";
import {
  getEditProfile,
  postEditProfile,
  getEditPassword,
  postEditPassword,
  getuserFriends
} from "../controlers/userController";

const userRouter = express.Router();

userRouter.get(routes.userFriends, onlyPrivate, getuserFriends);
userRouter.post(routes.editProfile, uploadProfile, postEditProfile);
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editPassword, onlyPrivate, postEditPassword);
userRouter.get(routes.editPassword, onlyPrivate, getEditPassword);

export default userRouter;
