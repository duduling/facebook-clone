// Global Controller.js

export const getHome = (req, res) => {
  res.render("home", { pageTile: "Home" });
};