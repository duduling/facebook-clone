// User Controller.js
import db from "../db";
import routes from "../routes";

export const getEditProfile = (req, res) => {
  res.render("editProfile", { pageTile: "Edit Profile", logged: req.user });
};
