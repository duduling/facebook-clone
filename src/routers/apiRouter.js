// Global Router.js
import express from "express";
import routes from "../routes";
import { postCheckId, postCheckPw } from "../controlers/apiController";

const apiRouter = express.Router();

apiRouter.post(routes.checkId, postCheckId);
apiRouter.post(routes.checkPw, postCheckPw);

export default apiRouter;
