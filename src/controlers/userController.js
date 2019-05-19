// User Controller.js
import crypto from "crypto";
import db from "../db";
import routes from "../routes";

export const getEditProfile = (req, res) => {
  const $waitMyFriend = `select * from WaitFriendList left join Users on Users.idx = WaitFriendList.senderIdx where recipientIdx = "${
    req.user.idx
  }";`;
  try {
    db.query($waitMyFriend, (err, rows) => {
      if (err) throw err;
      const waitMyFriendList = rows;

      res.render("editUserDetail", {
        pageTile: "Edit Profile",
        otherUser: req.user,
        waitMyFriendList
      });
    });
  } catch (error) {
    console.log(error);
    res.render("editUserDetail", {
      pageTile: "Edit Profile",
      otherUser: req.user,
      waitMyFriendList: []
    });
  }
};

export const postEditProfile = async (req, res) => {
  const {
    files: { profile, cover }
  } = req;
  const userProfileUrl =
    profile === undefined ? req.user.profile : profile[0].location;
  const userCoverUrl = cover === undefined ? req.user.cover : cover[0].location;

  try {
    // 가입 정보 넣기
    const $userProfileUpdate =
      "UPDATE Users SET `profile` = ?, `cover` = ? where `id`= ?";
    const $data = [userProfileUrl, userCoverUrl, req.user.id];

    await db.query($userProfileUpdate, $data, (error, _, __) => {
      if (error) {
        console.log(error);
      }
      res.redirect(`/user${routes.editProfile}`);
    });
  } catch (error) {
    res.status(400);
  }
};

export const getEditPassword = (req, res) => {
  const $waitMyFriend = `select * from WaitFriendList left join Users on Users.idx = WaitFriendList.senderIdx where recipientIdx = "${
    req.user.idx
  }";`;
  try {
    db.query($waitMyFriend, (err, rows) => {
      if (err) throw err;
      const waitMyFriendList = rows;

      res.render("editUserDetail", {
        pageTile: "Edit Password",
        otherUser: req.user,
        waitMyFriendList
      });
    });
  } catch (error) {
    console.log(error);
    res.render("editUserDetail", {
      pageTile: "Edit Password",
      otherUser: req.user,
      waitMyFriendList: []
    });
  }
};

export const postEditPassword = (req, res) => {
  let {
    body: { newPassword }
  } = req;

  let userPwSalt;

  try {
    crypto.randomBytes(64, (_, buf) => {
      crypto.pbkdf2(
        newPassword,
        buf.toString("base64"),
        parseInt(process.env.CRYPTO_SECRET, 10),
        parseInt(process.env.CRYPTO_OPTION1, 10),
        process.env.CRYPTO_OPTION2,
        (_, key) => {
          // 비밀번호
          newPassword = key.toString("base64");
          // 해당 비밀번호 salt
          userPwSalt = buf.toString("base64");

          // 수정된 정보 넣기
          const $userPwUpdate =
            "UPDATE Users SET `pw` = ?, `pw_salt` = ? where `id`= ?";
          const $data = [newPassword, userPwSalt, req.user.id];

          db.query($userPwUpdate, $data, (error, _, __) => {
            if (error) {
              console.log(error);
            }
            res.redirect(`/user${routes.editPassword}`);
          });
        }
      );
    });
  } catch (error) {
    res.status(400);
  }
};

export const getuserFriends = (req, res) => {
  const {
    params: { idx }
  } = req;

  const $friendListJoinUsers = `select Users.idx, name, profile from FriendList join Users on FriendList.friendIdx = Users.idx where FriendList.myIdx = "${idx}";`;
  const $selectNowUser = `select idx, profile, cover, name, id, sex from Users where idx = "${idx}";`;
  const $waitMyFriend = `select * from WaitFriendList left join Users on Users.idx = WaitFriendList.senderIdx where recipientIdx = "${
    req.user.idx
  }";`;
  try {
    db.query(
      $friendListJoinUsers + $selectNowUser + $waitMyFriend,
      (error, rows) => {
        const myFriends = rows[0];
        const otherUser = rows[1][0];
        const waitMyFriendList = rows[2];

        res.render("editUserDetail", {
          pageTile: "User Friends",
          myFriends,
          otherUser,
          waitMyFriendList
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
