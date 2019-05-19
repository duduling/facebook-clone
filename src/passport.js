// Passport
import passport from "passport";
import crypto from "crypto";
import db from "./db";

const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    // post from name
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (username, password, done) => {
      const $selectId = `SELECT * FROM Users WHERE id = "${username}";`;
      await db.query($selectId, async (err, rows) => {
        // Error
        if (err) done(err);

        // Not User
        if (rows.length === 0) {
          done(null, false, { message: "Incorrect username." });
        } else {
          const user = rows[0];

          // 암호화 비밀번호 확인
          await crypto.pbkdf2(
            password,
            user.pw_salt,
            parseInt(process.env.CRYPTO_SECRET, 10),
            parseInt(process.env.CRYPTO_OPTION1, 10),
            process.env.CRYPTO_OPTION2,
            (_, key) => {
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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  /* db 에서 id를 이용하여 user를 얻어서 done을 호출합니다 */
  const $selectId = `SELECT * FROM Users WHERE id="${id}";`;

  await db.query($selectId, (err, rows) => {
    if (err) throw err;
    const user = rows[0];
    done(err, user);
  });
});
