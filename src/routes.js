// Routes.js

// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";

// Feed
const FEEDS = "/feeds";
const FEEDS_MAIN = "/main";
const FEEDS_USER = "/:idx";

// User
const USER = "/user";
const EDIT_PROFILE = "/editProfile";

// API
const API = "/api";
const CHECK_ID = "/checkId";
const CHECK_PW = "/checkPw";

const routes = {
  // Global
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  // Feed
  feeds: FEEDS,
  feedsMain: FEEDS_MAIN,
  feedsUser: idx => {
    if (idx) {
      return `/feeds/${idx}`;
    }
    return FEEDS_USER;
  },
  // User
  user: USER,
  eidtProfile: EDIT_PROFILE,
  // API
  api: API,
  checkId: CHECK_ID,
  checkPw: CHECK_PW
};

export default routes;
