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
    // post from name
    {
      usernameField: "email",
      passwordField: "password"
    },
    (username, password, done) => {
      db.query("SELECT * FROM Users WHERE `id`=?", [username], (err, rows) => {
        // Error
        if (err) {
          done(err);
        }

        // Not User
        if (rows == "") {
          done(null, false, { message: "Incorrect username." });
        } else {
          console.log(rows);

          const user = rows[0];

          // 암호화 비밀번호 확인
          crypto.pbkdf2(
            password,
            user.pw_salt,
            parseInt(process.env.CRYPTO_SECRET, 10),
            parseInt(process.env.CRYPTO_OPTION1, 10),
            process.env.CRYPTO_OPTION2,
            (err, key) => {
              if (key.toString("base64") === user.pw) {
                // 로그인 성공
                done(null, user);
              } else {
                // 비밀번호가 일치하지 않습니다.
                done(null, false, { message: "Incorrect password." });
              }
            }
          );
        }
      });
    }
  )
);
