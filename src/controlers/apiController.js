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

export const postAddFriend = (req, res) => {
  const {
    body: { userIdx, whatDo }
  } = req;
  let $FriendInOut;
  let $dataObj;
  if (whatDo) {
    $FriendInOut = "INSERT INTO WaitFriendList set ? ;";
    $dataObj = {
      senderIdx: req.user.idx,
      recipientIdx: userIdx
    };
  } else {
    $FriendInOut = `DELETE FROM WaitFriendList where (senderIdx = "${
      req.user.idx
    }" and recipientIdx = "${userIdx}") or (senderIdx = "${userIdx}" and recipientIdx = "${
      req.user.idx
    }") ;`;
  }
  try {
    db.query($FriendInOut, $dataObj, err => {
      if (err) throw err;
      res.status(200);
    });
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
