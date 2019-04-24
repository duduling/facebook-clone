// Feed Controller.js

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

export const postCheckPw = async (req, res) => {};
