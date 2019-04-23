// Global Controller.js
import routes from "../routes";

export const getHome = (req, res) => {
  res.render("home", { pageTile: "Home" });
};

export const postLogin = (req, res) => {
  console.log(req);
  res.redirect(`/feeds${routes.feedsMain}`);
};

export const postJoin = (req, res) => {
  console.log(req);
  res.redirect(`/feeds${routes.feedsMain}`);
};
