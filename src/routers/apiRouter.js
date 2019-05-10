// Global Router.js
import express from "express";
import routes from "../routes";
import {
  postCheckId,
  postChaeckChangePw,
  postAddFriend,
  postConfirmFriend,
  postCancelFriend,
  postDeleteFriend,
  postRandomFriendRemove,
  postLikeCount
} from "../controlers/apiController";

const apiRouter = express.Router();

apiRouter.post(routes.checkId, postCheckId);
apiRouter.post(routes.chaeckChangePw, postChaeckChangePw);
apiRouter.post(routes.randomFriendRemove, postRandomFriendRemove);
apiRouter.post(routes.addFriend, postAddFriend);
apiRouter.post(routes.deleteFriend, postDeleteFriend);
apiRouter.post(routes.confirmFriend, postConfirmFriend);
apiRouter.post(routes.cancelFriend, postCancelFriend);
apiRouter.post(routes.likeCount, postLikeCount);

export default apiRouter;
