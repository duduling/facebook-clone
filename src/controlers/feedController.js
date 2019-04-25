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
