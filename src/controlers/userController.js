// User Controller.js
import db from "../db";
import routes from "../routes";

export const getEditProfile = (req, res) => {
  res.render("editUserDetail", {
    pageTile: "Edit Profile",
    otherUser: req.user
  });
};

export const getEditPassword = (req, res) => {
  res.render("editUserDetail", {
    pageTile: "Edit Password",
    otherUser: req.user
  });
};

export const getuserFriends = (req, res) => {
  res.render("editUserDetail", {
    pageTile: "User Friends",
    otherUser: req.user
  });
};
