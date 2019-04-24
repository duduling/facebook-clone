// Feed Controller.js

export const getFeedMain = (req, res) => {
  res.render("feedMain", { pageTile: "Feed Main" });
  console.log(req.user);
};
