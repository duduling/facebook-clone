// Feed Controller.js
import db from "../db";
import routes from "../routes";

export const getFeedMain = (req, res) => {
  const $feedJoinUser =
    "select Feeds.idx, writer, writer_idx, createdAt, fileUrl, description, likes, comments, profile from Feeds left join Users on Feeds.writer_idx = Users.idx ORDER BY Feeds.createdAt DESC;";
  const $adSelect = "select * from Ad order by rand() limit 3;";
  try {
    db.query($feedJoinUser + $adSelect, (_, rows) => {
      const feeds = rows[0];
      const asideAd = rows[1];

      res.render("feedMain", { pageTile: "Feed Main", feeds, asideAd });
    });
  } catch (error) {
    res.render("feedMain", { pageTile: "Feed Main", feeds: [] });
  }
};

export const getFeedUser = (req, res) => {
  const {
    params: { idx }
  } = req;
  try {
    const $loggedUserSelect = db.format(
      "SELECT * FROM Users where `idx`=?;",
      idx
    );
    const $feedSelect = db.format(
      "SELECT * FROM Feeds where `writer_idx`=?;",
      idx
    );
    const $adSelect = "select * from Ad order by rand() limit 3;";

    db.query($loggedUserSelect + $feedSelect + $adSelect, (_, rows) => {
      const otherUser = rows[0][0];
      const feeds = rows[1];
      const asideAd = rows[2];
      res.render("feedUser", {
        pageTile: "Feed User",
        otherUser,
        feeds,
        asideAd
      });
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postFeedsUpload = (req, res) => {
  const {
    body: { uploadText },
    file
  } = req;
  try {
    const feedInsert =
      "INSERT INTO Feeds(`writer`, `writer_idx`, `fileUrl`, `description`) VALUES(?, ?, ?, ?);";
    const data = [
      req.user.name,
      req.user.idx,
      file ? `/${file.path}` : null,
      uploadText
    ];
    db.query(feedInsert, data, (err, rows, fields) => {
      if (err) {
        throw err;
      } else {
        res.redirect(`/feeds${routes.feedsMain}`);
      }
    });
  } catch (error) {
    res.status(400);
  }
};

export const getFeedSearch = (req, res) => {
  const $feedJoinUser =
    "select Feeds.idx, writer, writer_idx, createdAt, fileUrl, description, likes, profile from Feeds left join Users on Feeds.writer_idx = Users.idx;";
  const $adSelect = "select * from Ad order by rand() limit 3;";

  try {
    db.query($feedJoinUser + $adSelect, (_, rows) => {
      const feeds = rows[0];
      const asideAd = rows[1];

      res.render("feedSearch", { pageTile: "Feed Search", feeds, asideAd });
    });
  } catch (error) {
    console.log(error);
    res.render("feedSearch", { pageTile: "Feed Search", feeds: [] });
  }
};
