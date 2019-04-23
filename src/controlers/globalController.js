// Global Controller.js
import crypto from "crypto";
import db from "../db";
import routes from "../routes";

export const getHome = (req, res) => {
  res.render("home", { pageTile: "Home" });
};

export const postLogin = (req, res) => {
  res.redirect(`/feeds${routes.feedsMain}`);
};

export const postJoin = (req, res) => {
  const {
    body: { userName, email, birthYear, birthMonth, birthDay, sex }
  } = req;

  let {
    body: { password }
  } = req;

  let userPwSalt;

  crypto.randomBytes(64, (_, buf) => {
    crypto.pbkdf2(
      password,
      buf.toString("base64"),
      161602,
      64,
      "sha512",
      (_, key) => {
        // 비밀번호
        password = key.toString("base64");
        // 해당 비밀번호 salt
        userPwSalt = buf.toString("base64");

        const sql =
          "INSERT INTO Users(`id`, `pw`, `pw-salt`, `name`, `birth`, `sex`) VALUES(?, ?, ?, ?, ?, ?);";
        const data = [email, password, userPwSalt, userName, "19931009", sex];

        db.query(sql, data, (error, _, __) => {
          if (error) {
            console.log(error);
            res.redirect(routes.home);
          } else {
            console.log(userPwSalt);
            res.redirect(`/feeds${routes.feedsMain}`);
          }
        });
      }
    );
  });
};
