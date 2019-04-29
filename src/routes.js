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
const FEEDS_SEARCH = "/search";

// User
const USER = "/user";
const USER_FRIENDS = "/userFriends";
const EDIT_PROFILE = "/editProfile";
const EDIT_PASSWORD = "/editPassword";

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
  feedsSearch: FEEDS_SEARCH,
  userFriends: USER_FRIENDS,
  // User
  user: USER,
  editProfile: EDIT_PROFILE,
  editPassword: EDIT_PASSWORD,
  // API
  api: API,
  checkId: CHECK_ID,
  checkPw: CHECK_PW
};

export default routes;
