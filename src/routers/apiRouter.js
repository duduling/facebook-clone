// Global Router.js
import express from "express";
import routes from "../routes";
import { postCheckId, postChaeckChangePw } from "../controlers/apiController";

const apiRouter = express.Router();

apiRouter.post(routes.checkId, postCheckId);
apiRouter.post(routes.chaeckChangePw, postChaeckChangePw);

export default apiRouter;
