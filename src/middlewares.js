import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Facebook";
  res.locals.routes = routes;
  res.locals.user = req.user;
  next();
};

// 로그인 한 유저 못들어감
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.feedsMain);
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
