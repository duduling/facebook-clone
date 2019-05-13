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
const FEEDS_UPLOAD = "/upload";
const FEEDS_EDIT = "/edit";
const FEEDS_DELETE = "/:idx/delete";

// User
const USER = "/user";
const USER_FRIENDS = "/:idx/Friends";
const EDIT_PROFILE = "/editProfile";
const EDIT_PASSWORD = "/editPassword";

// API
const API = "/api";
const CHECK_ID = "/checkId";
const CHECK_CHANGE_PW = "/checkChangePw";
const RANDOM_FRIEND_REMOVE = "/randomFriendRemove";
const ADD_FRIEND = "/addFriend";
const DELETE_FRIEND = "/deleteFriend";
const CONFIRM_FRIEND = "/confirmFriend";
const CANCEL_FRIEND = "/cancelFriend";
const LIKE_COUNT = "/likeCount";
const SELECT_COMMENT = "/selectComment";
const ADD_COMMENT = "/addComment";
const EDIT_COMMENT = "/editComment";
const DELETE_COMMENT = "/deleteComment";

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
  feedsUpload: FEEDS_UPLOAD,
  feedsEdit: FEEDS_EDIT,
  feedsDelete: idx => {
    if (idx) {
      return `/feeds/${idx}/delete`;
    }
    return FEEDS_DELETE;
  },
  // User
  user: USER,
  userFriends: idx => {
    if (idx) {
      return `/user/${idx}/Friends`;
    }
    return USER_FRIENDS;
  },
  editProfile: EDIT_PROFILE,
  editPassword: EDIT_PASSWORD,
  // API
  api: API,
  checkId: CHECK_ID,
  chaeckChangePw: CHECK_CHANGE_PW,
  randomFriendRemove: RANDOM_FRIEND_REMOVE,
  addFriend: ADD_FRIEND,
  deleteFriend: DELETE_FRIEND,
  confirmFriend: CONFIRM_FRIEND,
  cancelFriend: CANCEL_FRIEND,
  likeCount: LIKE_COUNT,
  selectComment: SELECT_COMMENT,
  addComment: ADD_COMMENT,
  editComment: EDIT_COMMENT,
  deleteComment: DELETE_COMMENT
};

export default routes;
