// Feed Controller.js
import crypto from "crypto";
import db from "../db";

export const postCheckId = async (req, res) => {
  const {
    body: { checkWord }
  } = req;

  try {
    await db.query(
      "SELECT * FROM Users WHERE `id`=?",
      [checkWord],
      (err, rows) => {
        if (!rows[0]) {
          res.end("true");
        } else {
          res.end("false");
        }
      }
    );
  } catch (error) {
    res.status(400);
  }
};

export const postChaeckChangePw = async (req, res) => {
  const {
    body: { checkChangePw }
  } = req;
  try {
    await db.query(
      "SELECT * FROM Users WHERE `id`=?",
      [req.user.id],
      (err, rows) => {
        const checkUser = rows[0];
        // 암호화 비밀번호 확인
        crypto.pbkdf2(
          // 넘어 온 비밀번호
          checkChangePw,
          // 확인 할 유저의 솔트
          checkUser.pw_salt,
          parseInt(process.env.CRYPTO_SECRET, 10),
          parseInt(process.env.CRYPTO_OPTION1, 10),
          process.env.CRYPTO_OPTION2,
          (err, key) => {
            if (key.toString("base64") === checkUser.pw) {
              // 로그인 성공
              res.end("true");
            } else {
              // 비밀번호가 일치하지 않습니다.
              res.end("false");
            }
          }
        );
      }
    );
  } catch (error) {
    res.status(400);
  }
};

export const postAddFriend = async (req, res) => {
  const {
    body: { targetIdx, whatDo }
  } = req;
  const $FriendInOut = "INSERT INTO WaitFriendList set ? ;";
  const $dataObj = {
    senderIdx: req.user.idx,
    recipientIdx: targetIdx
  };
  try {
    if (whatDo === "addRandomFriend") {
      const $selectAddRandomFriend = `select idx, name, profile from Users where not idx = "${
        req.user.idx
      }" order by rand() limit 1;`;
      await db.query(
        $FriendInOut + $selectAddRandomFriend,
        $dataObj,
        (err, rows) => {
          if (err) throw err;
          console.log(rows[1]);
          if (rows[1].length !== 0) {
            res.status(200).json({ rows: rows[1][0] });
            res.end();
          }
        }
      );
    } else {
      db.query($FriendInOut, $dataObj, err => {
        if (err) throw err;
        res.status(200);
        res.end();
      });
    }
  } catch (error) {
    res.status(400);
    res.end();
  }
};

export const postDeleteFriend = (req, res) => {
  const {
    body: { targetIdx }
  } = req;
  const $deleteFriendList = `delete from FriendList where myIdx = "${targetIdx}" and friendIdx = "${
    req.user.idx
  }" or myIdx = "${req.user.idx}" and friendIdx = "${targetIdx}";`;
  try {
    db.query($deleteFriendList, err => {
      if (err) throw err;
      res.status(200);
    });
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postConfirmFriend = (req, res) => {
  const {
    body: { targetIdx }
  } = req;
  const $deleteWaitFriendList = `delete from WaitFriendList where senderIdx = "${targetIdx}" and recipientIdx = "${
    req.user.idx
  }";`;
  const $insertFriendList = `insert into FriendList (myIdx, friendIdx) values ("${
    req.user.idx
  }", "${targetIdx}"), ("${targetIdx}", "${req.user.idx}");`;
  try {
    db.query($deleteWaitFriendList + $insertFriendList, err => {
      if (err) throw err;
      res.status(200);
    });
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postCancelFriend = (req, res) => {
  const {
    body: { targetIdx }
  } = req;
  const $deleteWaitFriendList = `delete from WaitFriendList where senderIdx = "${targetIdx}" and recipientIdx = "${
    req.user.idx
  }" or senderIdx = "${req.user.idx}" and recipientIdx = "${targetIdx}";`;
  try {
    db.query($deleteWaitFriendList, err => {
      if (err) throw err;
      res.status(200);
    });
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
