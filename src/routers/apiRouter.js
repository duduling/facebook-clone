// Global Router.js
import express from "express";
import routes from "../routes";
import {
  postCheckId,
  postChaeckChangePw,
  postAddFriend
} from "../controlers/apiController";

const apiRouter = express.Router();

apiRouter.post(routes.checkId, postCheckId);
apiRouter.post(routes.chaeckChangePw, postChaeckChangePw);
apiRouter.post(routes.addFriend, postAddFriend);

export default apiRouter;
