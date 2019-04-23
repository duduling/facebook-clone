// Passport
import passport from "passport";
import crypto from "crypto";
import db from "./db";

const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  /* db 에서 id를 이용하여 user를 얻어서 done을 호출합니다 */
  db.query("SELECT * FROM Users WHERE `id`=?", [id], (err, rows) => {
    const user = rows[0];
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "loginId",
      passwordField: "loginPw"
    },
    (username, password, done) => {
      db.query("SELECT * FROM Users WHERE `id`=?", [username], (err, rows) => {
        const user = rows[0];

        // Error
        if (err) {
          done(err);
        }

        // Not User
        if (!user) {
          done(null, false, { message: "Incorrect username." });
        }

        crypto.pbkdf2(
          password,
          user.pw_salt,
          parseInt(process.env.CRYPTO_SECRET, 10),
          parseInt(process.env.CRYPTO_OPTION1, 10),
          process.env.CRYPTO_OPTION2,
          (err, key) => {
            console.log(key.toString("base64"));
            console.log(user.pw);
            if (key.toString("base64") === user.pw) {
              // 로그인 성공
              done(null, user);
            } else {
              // 비밀번호가 일치하지 않습니다.
              done(null, false, { message: "Incorrect password." });
            }
          }
        );
      });
    }
  )
);
