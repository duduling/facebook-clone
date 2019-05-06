// Feed Controller.js
import db from "../db";
import routes from "../routes";

export const getFeedMain = (req, res) => {
  const $feedJoinUser =
    "select Feeds.idx, writer, writer_idx, createdAt, fileUrl, description, likes, comments, profile from Feeds left join Users on Feeds.writer_idx = Users.idx ORDER BY Feeds.createdAt DESC;";
  const $randomUsersSelect = `select * from Users where not idx = ${
    req.user.idx
  } order by rand() limit 4;`;
  const $waitMyFriend = `select * from WaitFriendList left join Users on Users.idx = WaitFriendList.senderIdx where recipientIdx = "${
    req.user.idx
  }";`;
  const $adSelect = "select * from Ad order by rand() limit 3;";
  try {
    db.query(
      $feedJoinUser + $randomUsersSelect + $waitMyFriend + $adSelect,
      (_, rows) => {
        const feeds = rows[0];
        const ramdomUsers = rows[1];
        const waitMyFriendList = rows[2];
        const asideAd = rows[3];

        res.render("feedMain", {
          pageTile: "Feed Main",
          feeds,
          ramdomUsers,
          waitMyFriendList,
          asideAd
        });
      }
    );
  } catch (error) {
    res.render("feedMain", { pageTile: "Feed Main", feeds: [] });
  }
};

export const getFeedUser = (req, res) => {
  const {
    params: { idx: otherIdx }
  } = req;
  try {
    const $loggedUserSelect = db.format(
      "SELECT * FROM Users where `idx`=?;",
      otherIdx
    );
    const $feedSelect = db.format(
      "SELECT * FROM Feeds where `writer_idx`=?;",
      otherIdx
    );
    const $areYouMyFriend = `select * from WaitFriendList where (senderIdx = "${
      req.user.idx
    }" and recipientIdx = "${otherIdx}") or (senderIdx = "${otherIdx}" and recipientIdx = "${
      req.user.idx
    }");`;
    const $friendListJoinUsers = `select Users.idx, name, profile from FriendList join Users on FriendList.friendIdx = Users.idx where FriendList.myIdx = "${otherIdx}";`;
    const $adSelect = "select * from Ad order by rand() limit 3;";

    db.query(
      $loggedUserSelect +
        $feedSelect +
        $areYouMyFriend +
        $friendListJoinUsers +
        $adSelect,
      (_, rows) => {
        const otherUser = rows[0][0];
        const feeds = rows[1];
        const waitFriend = rows[2].length !== 0;
        const friendList = rows[3].slice(0, 9);
        const friendNumber = rows[3].length;
        const asideAd = rows[4];

        res.render("feedUser", {
          pageTile: "Feed User",
          otherUser,
          feeds,
          waitFriend,
          friendList,
          friendNumber,
          asideAd
        });
      }
    );
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
    const $feedInsert = "INSERT INTO Feeds set ?;";
    const $dataObj = {
      writer: req.user.name,
      writer_idx: req.user.idx,
      fileUrl: file ? `/${file.path}` : null,
      description: uploadText
    };
    db.query($feedInsert, $dataObj, (err, rows, fields) => {
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
  const {
    query: { searchWord }
  } = req;
  const $feedJoinUser = `select Feeds.idx, writer, writer_idx, createdAt, fileUrl, description, likes, profile from Feeds left join Users on Feeds.writer_idx = Users.idx where Feeds.writer like "%${searchWord}%" or Feeds.description like "%${searchWord}%";`;
  const $userSearchSelect = `select idx, id, name, sex, profile, birth from Users where Users.name like "%${searchWord}%" or Users.id like "%${searchWord}%";`;
  const $randomUsersSelect = `select * from Users where not idx = ${
    req.user.idx
  } order by rand() limit 4;`;
  const $adSelect = "select * from Ad order by rand() limit 3;";

  try {
    db.query(
      $feedJoinUser + $userSearchSelect + $randomUsersSelect + $adSelect,
      (_, rows) => {
        const searchFeeds = rows[0];
        const searchUsers = rows[1];
        const ramdomUsers = rows[2];
        const asideAd = rows[3];

        res.render("feedSearch", {
          pageTile: "Feed Search",
          feeds: searchFeeds,
          searchUsers,
          ramdomUsers,
          asideAd
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.render("feedSearch", { pageTile: "Feed Search", feeds: [] });
  }
};
