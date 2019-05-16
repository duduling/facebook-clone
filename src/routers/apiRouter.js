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
  postLikeCount,
  postAddComment,
  postEditComment,
  postDeleteComment,
  postSelectComment,
  postSelectCocomment,
  postAddCocomment,
  postEditCocomment,
  postDeleteCocomment,
  postSelectFeedPaging
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
apiRouter.post(routes.selectFeedPaging, postSelectFeedPaging);
apiRouter.post(routes.selectComment, postSelectComment);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.editComment, postEditComment);
apiRouter.post(routes.deleteComment, postDeleteComment);
apiRouter.post(routes.selectCocomment, postSelectCocomment);
apiRouter.post(routes.addCocomment, postAddCocomment);
apiRouter.post(routes.editCocomment, postEditCocomment);
apiRouter.post(routes.deleteCocomment, postDeleteCocomment);

export default apiRouter;
