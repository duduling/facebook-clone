// init.js
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const { PORT } = process.env;

function handleListening() {
  // eslint-disable-next-line no-irregular-whitespace
  console.log(`✅　Listening on: http://localhost:${PORT}`);
}

app.listen(PORT, handleListening);
