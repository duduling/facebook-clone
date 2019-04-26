// Feed Controller.js
import db from "../db";

export const getFeedMain = (req, res) => {
  try {
    db.query("SELECT * FROM Feeds", (_, rows) => {
      res.render("feedMain", { pageTile: "Feed Main", feeds: rows });
    });
  } catch (error) {
    console.log(error);
    res.render("feedMain", { pageTile: "Feed Main", feeds: [] });
  }
};

export const getFeedUser = (req, res) => {
  const {
    params: { idx }
  } = req;
  res.render("feedUser", { pageTile: "Feed User", otherUser: idx });
};
