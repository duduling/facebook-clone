// User Controller.js
import crypto from "crypto";
import db from "../db";
import routes from "../routes";

export const getEditProfile = (req, res) => {
  res.render("editUserDetail", {
    pageTile: "Edit Profile",
    otherUser: req.user
  });
};

export const getEditPassword = (req, res) => {
  res.render("editUserDetail", {
    pageTile: "Edit Password",
    otherUser: req.user
  });
};

export const postEditPassword = (req, res) => {
  let {
    body: { newPassword }
  } = req;

  let userPwSalt;

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

        // 가입 정보 넣기
        const sql = "UPDATE Users SET `pw` = ?, `pw_salt` = ? where `id`= ?";
        const data = [newPassword, userPwSalt, req.user.id];

        db.query(sql, data, (error, _, __) => {
          if (error) {
            console.log(error);
          }
          res.redirect(`/user${routes.editPassword}`);
        });
      }
    );
  });
};

export const getuserFriends = (req, res) => {
  res.render("editUserDetail", {
    pageTile: "User Friends",
    otherUser: req.user
  });
};
