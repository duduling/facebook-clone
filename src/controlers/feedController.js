// Feed Controller.js
import db from "../db";
import routes from "../routes";

export const getFeedMain = (req, res) => {
  const $feedJoinUser =
    "select Feeds.idx, writer, writer_idx, fromIdx, fromName, createdAt, fileUrl, description, likes, comments, profile, edited from Feeds left join Users on Feeds.writer_idx = Users.idx ORDER BY Feeds.createdAt DESC limit 5;";
  const $commentJoinUser =
    "select CommentList.idx, feedIdx, writerIdx, createdAt, description, profile, name FROM CommentList left join Users on CommentList.writerIdx = Users.idx ORDER BY CommentList.createdAt DESC;";
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
        $commentJoinUser +
        $likeListSelect +
        $randomUsersSelect +
        $waitMyFriend +
        $adSelect,
      (_, rows) => {
        const feeds = rows[0];
        const comments = rows[1];
        const likeList = [];
        const ramdomUsers = rows[3];
        const waitMyFriendList = rows[4];
        const asideAd = rows[5];

        for (let i = 0; i < rows[2].length; i++) {
          likeList.push(rows[2][i].feedIdx);
        }

        res.render("feedMain", {
          pageTile: "Feed Main",
          feeds,
          comments,
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

export const getFeedUser = async (req, res) => {
  const {
    params: { idx: otherIdx }
  } = req;
  try {
    const $loggedUserSelect = db.format(
      "SELECT * FROM Users where `idx`=?;",
      otherIdx
    );
    const $feedJoinUser = `select Feeds.idx, writer, fromIdx, fromName, writer_idx, createdAt, fileUrl, description, likes, comments, profile from Feeds left join Users on Feeds.writer_idx = Users.idx WHERE Feeds.fromIdx = "${otherIdx}" ORDER BY Feeds.createdAt DESC limit 5;`;
    const $likeListSelect = `select feedIdx from FeedLikeList where userIdx = "${
      req.user.idx
    }";`;
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

    await db.query(
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
        const likeList = [];
        const waitFriend = rows[3].length !== 0;
        const friendList = rows[4].slice(0, 9);
        const friendNumber = rows[4].length;
        const waitMyFriendList = rows[5];
        const friendBoolean = rows[6].length !== 0;
        const asideAd = rows[7];

        for (let i = 0; i < rows[2].length; i++) {
          likeList.push(rows[2][i].feedIdx);
        }

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
    headers: { referer },
    body: { uploadText, fromName },
    file
  } = req;

  const fromIdx = referer.split("http://localhost:3000/feeds/")[1];

  try {
    const $feedInsert = "INSERT INTO Feeds set ?;";
    const $dataObj = {
      writer: req.user.name,
      writer_idx: req.user.idx,
      fromIdx: fromIdx !== "main" ? fromIdx : req.user.idx,
      fromName,
      fileUrl: file ? `/${file.path}` : null,
      description: uploadText
    };
    db.query($feedInsert, $dataObj, err => {
      if (err) {
        throw err;
      } else {
        res.redirect(referer);
      }
    });
  } catch (error) {
    res.status(400);
  }
};

export const postFeedsEdit = (req, res) => {
  const {
    headers: { referer },
    body: { uploadText, feedInputIdx },
    file
  } = req;
  try {
    const $feedUpdate = `update Feeds set ? where idx = "${feedInputIdx}";`;
    const $dataObj = {
      fileUrl: file ? `/${file.path}` : null,
      description: uploadText,
      edited: 1
    };
    db.query($feedUpdate, $dataObj, err => {
      if (err) {
        throw err;
      } else {
        res.redirect(referer);
      }
    });
  } catch (error) {
    res.status(400);
  }
};

export const postFeedDelete = (req, res) => {
  const {
    headers: { referer },
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
    res.redirect(referer);
  }
};

export const getFeedSearch = (req, res) => {
  const {
    query: { searchWord }
  } = req;
  const $feedJoinUser = `select Feeds.idx, writer, writer_idx, createdAt, fileUrl, description, likes, profile from Feeds left join Users on Feeds.writer_idx = Users.idx where Feeds.writer like "%${searchWord}%" or Feeds.description like "%${searchWord}%" ORDER BY Feeds.createdAt DESC;`;
  const $likeListSelect = `select feedIdx from FeedLikeList where userIdx = "${
    req.user.idx
  }";`;
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
        $likeListSelect +
        $userSearchSelect +
        $randomUsersSelect +
        $waitMyFriend +
        $adSelect,
      (_, rows) => {
        const searchFeeds = rows[0];
        const likeList = [];
        const searchUsers = rows[2];
        const ramdomUsers = rows[3];
        const waitMyFriendList = rows[4];
        const asideAd = rows[5];

        for (let i = 0; i < rows[1].length; i++) {
          likeList.push(rows[1][i].feedIdx);
        }

        res.render("feedSearch", {
          pageTile: "Feed Search",
          feeds: searchFeeds,
          searchUsers,
          likeList,
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
