// Passport
import passport from "passport";
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
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (user.pw !== password) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      });
    }
  )
);
