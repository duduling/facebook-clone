// Global Controller.js
import crypto from "crypto";
import passport from "passport";
import db from "../db";
import routes from "../routes";

export const getHome = (req, res) => {
  res.render("home", { pageTile: "Home" });
};

export const postLogin = passport.authenticate("local", {
  successRedirect: `/feeds${routes.feedsMain}`,
  failureRedirect: routes.home
});

export const middlewareLogout = (req, res, next) => {
  req.logout();
  // middle ware가 logout 보다 처리순서가 앞이라 로그아웃하면서 초기화 시켜줘야 함
  res.locals.user = null;
  next();
};

export const postJoin = (req, res, next) => {
  const {
    body: { userName, email, birthYear, sex }
  } = req;

  let {
    body: { birthMonth, birthDay }
  } = req;

  let {
    body: { password }
  } = req;

  toString(birthYear);

  if (birthMonth < 10) {
    toString(birthYear);
    birthMonth = `0${birthMonth}`;
  } else {
    toString(birthYear);
  }

  if (birthDay < 10) {
    toString(birthYear);
    birthDay = `0${birthDay}`;
  } else {
    toString(birthDay);
  }

  let userPwSalt;

  const bitrh = birthYear + birthMonth + birthDay;

  crypto.randomBytes(64, (_, buf) => {
    crypto.pbkdf2(
      password,
      buf.toString("base64"),
      parseInt(process.env.CRYPTO_SECRET, 10),
      parseInt(process.env.CRYPTO_OPTION1, 10),
      process.env.CRYPTO_OPTION2,
      (_, key) => {
        // 비밀번호
        password = key.toString("base64");
        // 해당 비밀번호 salt
        userPwSalt = buf.toString("base64");

        // 가입 정보 넣기
        const sql =
          "INSERT INTO Users(`id`, `pw`, `pw_salt`, `name`, `birth`, `sex`) VALUES(?, ?, ?, ?, ?, ?);";
        const data = [email, password, userPwSalt, userName, bitrh, sex];

        db.query(sql, data, (error, _, __) => {
          if (error) {
            console.log(error);
          } else {
            console.log(userPwSalt);
          }
          next();
        });
      }
    );
  });
};
