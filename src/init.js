// init.js
import "@babel/polyfill";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const { PORT } = process.env;

function handleListening() {
  // eslint-disable-next-line no-irregular-whitespace
  console.log(`✅　Listening on: http://localhost:${PORT}`);
}

// app.listen(PORT, handleListening);
app.listen(PORT || 4000, () => {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
