const express = require("express");
const bodyParser = require("body-parser");
const CONFIG = require("./config/config");

const connectToDb = require("./db/mongodb");

const app = express();

// Add middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello book store!");
});

connectToDb();
app.listen(CONFIG.PORT, () => {
  console.log(`server running on http://localhost:${CONFIG.PORT}`);
});
