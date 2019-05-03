// Middle Wares
import multer from "multer";
import routes from "./routes";

// 파일 저장할 경로 지정
const multerVideo = multer({ dest: "src/uploads/videos/" });
const multerFeed = multer({ dest: "src/uploads/feeds/" });
const multerProfile = multer({ dest: "src/uploads/profiles/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Facebook";
  res.locals.routes = routes;
  res.locals.user = req.user;
  next();
};

// 로그인 한 유저 못들어감
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(`/feeds${routes.feedsMain}`);
  } else {
    next();
  }
};

// 로그인 한 유저만 들어감
export const onlyPrivate = (req, res, next) => {
  if (!req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

// videoFile이라는 name의 Data 하나만 업로드 함
export const uploadProfile = multerProfile.fields([
  { name: "cover", maxCount: 1 },
  { name: "profile", maxCount: 1 }
]);
export const uploadFeed = multerFeed.single("uploadFeed");
export const uploadVideo = multerVideo.single("videoFile");
