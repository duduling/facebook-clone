// Feed Controller.js
import db from "../db";
import routes from "../routes";

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
  try {
    const query =
      "SELECT * FROM Users where `idx`=?; SELECT * FROM Feeds where `writer_idx`=?";
    db.query(query, [idx, idx], (_, rows) => {
      const otherUser = rows[0][0];
      const feeds = rows[1];

      res.render("feedUser", {
        pageTile: "Feed User",
        otherUser,
        feeds
      });
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
