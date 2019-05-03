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

export const logout = async (req, res) => {
  try {
    await req.logout();
    res.locals.user = null;
    res.redirect(routes.home);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

export const postJoin = (req, res, next) => {
  const {
    body: { userName, email, birthYear, sex }
  } = req;

  const profile =
    sex === "남성" ? process.env.SEX_MALE : process.env.SEX_FEMALE;

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
        const joinInsert =
          "INSERT INTO Users(`id`, `pw`, `pw_salt`, `name`, `birth`, `sex`, `profile`) VALUES(?, ?, ?, ?, ?, ?, ?);";
        const data = [
          email,
          password,
          userPwSalt,
          userName,
          bitrh,
          sex,
          profile
        ];

        db.query(joinInsert, data, (error, _, __) => {
          if (error) {
            return res.status(400);
          }
          next();
        });
      }
    );
  });
};
