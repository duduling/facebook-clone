// User Controller.js
import db from "../db";
import routes from "../routes";

export const getEditProfile = (req, res) => {
  res.render("editUserDetail", { pageTile: "Edit Profile", logged: req.user });
};

export const getEditPassword = (req, res) => {
  res.render("editUserDetail", { pageTile: "Edit Password", logged: req.user });
};
