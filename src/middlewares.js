// Middle Wares
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

const awsS3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2"
});

// 파일 저장할 경로 지정 Local Version
// const multerFeed = multer({ dest: "src/uploads/feeds/" });
// const multerProfile = multer({ dest: "src/uploads/profiles/" });

// 파일 저장할 경로 지정 AWS-S3 Version
const multerFeed = multer({
  storage: multerS3({
    s3: awsS3,
    acl: "public-read",
    bucket: "facebookcloneofduv/feeds"
  })
});
const multerProfile = multer({
  storage: multerS3({
    s3: awsS3,
    acl: "public-read",
    bucket: "facebookcloneofduv/profiles"
  })
});

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
