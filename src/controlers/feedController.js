// Feed Controller.js
import db from "../db";
import routes from "../routes";

export const getFeedMain = (req, res) => {
  const $feedJoinUser =
    "select Feeds.idx, writer, writer_idx, createdAt, fileUrl, description, likes, comments, profile from Feeds left join Users on Feeds.writer_idx = Users.idx ORDER BY Feeds.createdAt DESC;";
  const $likeListSelect = `select feedIdx from FeedLikeList where userIdx = "${
    req.user.idx
  }";`;
  const $randomUsersSelect = `SELECT idx, name, profile from Users WHERE not idx = any(SELECT friendIdx FROM FriendList WHERE myIdx = "${
    req.user.idx
  }") AND idx NOT IN ("${req.user.idx}") order by rand() limit 4;`;
  const $waitMyFriend = `select * from WaitFriendList left join Users on Users.idx = WaitFriendList.senderIdx where recipientIdx = "${
    req.user.idx
  }";`;
  const $adSelect = "select * from Ad order by rand() limit 3;";
  try {
    db.query(
      $feedJoinUser +
        $likeListSelect +
        $randomUsersSelect +
        $waitMyFriend +
        $adSelect,
      (_, rows) => {
        const feeds = rows[0];
        const likeList = [];
        const ramdomUsers = rows[2];
        const waitMyFriendList = rows[3];
        const asideAd = rows[4];

        for (let i = 0; i < rows[1].length; i++) {
          likeList.push(rows[1][i].feedIdx);
        }

        res.render("feedMain", {
          pageTile: "Feed Main",
          feeds,
          likeList,
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
    const $feedJoinUser = `select Feeds.idx, writer, writer_idx, createdAt, fileUrl, description, likes, comments, profile from Feeds left join Users on Feeds.writer_idx = Users.idx WHERE Users.idx = "${otherIdx}" ORDER BY Feeds.createdAt DESC;`;
    const $likeListSelect = `select feedIdx from FeedLikeList where userIdx = "${
      req.user.idx
    }"`;
    const $areYouMyFriend = `select * from WaitFriendList where (senderIdx = "${
      req.user.idx
    }" and recipientIdx = "${otherIdx}") or (senderIdx = "${otherIdx}" and recipientIdx = "${
      req.user.idx
    }");`;
    const $friendListJoinUsers = `select Users.idx, name, profile from FriendList join Users on FriendList.friendIdx = Users.idx where FriendList.myIdx = "${otherIdx}";`;
    const $waitMyFriend = `select * from WaitFriendList left join Users on Users.idx = WaitFriendList.senderIdx where recipientIdx = "${
      req.user.idx
    }";`;
    const $myfriendBoolean = `select idx from FriendList where myIdx = "${
      req.user.idx
    }" and friendIdx = "${otherIdx}";`;
    const $adSelect = "select * from Ad order by rand() limit 3;";

    db.query(
      $loggedUserSelect +
        $feedJoinUser +
        $likeListSelect +
        $areYouMyFriend +
        $friendListJoinUsers +
        $waitMyFriend +
        $myfriendBoolean +
        $adSelect,
      (_, rows) => {
        const otherUser = rows[0][0];
        const feeds = rows[1];
        const waitFriend = rows[2].length !== 0;
        const likeList = rows[3];
        const friendList = rows[4].slice(0, 9);
        const friendNumber = rows[4].length;
        const waitMyFriendList = rows[5];
        const friendBoolean = rows[6].length !== 0;
        const asideAd = rows[7];

        res.render("feedUser", {
          pageTile: "Feed User",
          otherUser,
          feeds,
          waitFriend,
          likeList,
          friendList,
          friendNumber,
          waitMyFriendList,
          friendBoolean,
          asideAd
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.redirect(routes.feedsMain);
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
      writer_id: req.user.id,
      writer_idx: req.user.idx,
      fileUrl: file ? `/${file.path}` : null,
      description: uploadText
    };
    db.query($feedInsert, $dataObj, err => {
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

export const postFeedDelete = (req, res) => {
  const {
    params: { idx }
  } = req;
  try {
    const feedDelte = `DELETE FROM Feeds WHERE idx = "${idx}";`;
    db.query(feedDelte, err => {
      if (err) throw err;
    });
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.redirect(`/feeds${routes.feedsMain}`);
  }
};

export const getFeedSearch = (req, res) => {
  const {
    query: { searchWord }
  } = req;
  const $feedJoinUser = `select Feeds.idx, writer, writer_idx, createdAt, fileUrl, description, likes, profile from Feeds left join Users on Feeds.writer_idx = Users.idx where Feeds.writer like "%${searchWord}%" or Feeds.description like "%${searchWord}%";`;
  const $userSearchSelect = `select idx, id, name, sex, profile, birth from Users where Users.name like "%${searchWord}%" or Users.id like "%${searchWord}%";`;
  const $randomUsersSelect = `SELECT idx, name, profile from Users WHERE not idx = any(SELECT friendIdx FROM FriendList WHERE myIdx = "${
    req.user.idx
  }") AND idx NOT IN ("${req.user.idx}") order by rand() limit 4;`;
  const $waitMyFriend = `select * from WaitFriendList left join Users on Users.idx = WaitFriendList.senderIdx where recipientIdx = "${
    req.user.idx
  }";`;
  const $adSelect = "select * from Ad order by rand() limit 3;";

  try {
    db.query(
      $feedJoinUser +
        $userSearchSelect +
        $randomUsersSelect +
        $waitMyFriend +
        $adSelect,
      (_, rows) => {
        const searchFeeds = rows[0];
        const searchUsers = rows[1];
        const ramdomUsers = rows[2];
        const waitMyFriendList = rows[3];
        const asideAd = rows[4];

        res.render("feedSearch", {
          pageTile: "Feed Search",
          feeds: searchFeeds,
          searchUsers,
          ramdomUsers,
          waitMyFriendList,
          asideAd
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.render("feedSearch", { pageTile: "Feed Search", feeds: [] });
  }
};
