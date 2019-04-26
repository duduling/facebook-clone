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
    db.query("SELECT * FROM Feeds where `writer_idx`=?", [idx], (_, rows) => {
      res.render("feedUser", {
        pageTile: "Feed User",
        otherUser: idx,
        feeds: rows
      });
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
