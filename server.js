const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
app.use(cors());
app.use(express.json());
require("dotenv").config();
const db = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
});
app.get("/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true")
  try {
    const info = await db("users").select();
    res.json(info);
  } catch (e) {
    res.json(e);
  }
});
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));
