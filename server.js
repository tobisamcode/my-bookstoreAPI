const express = require("express");
const bodyParser = require("body-parser");
const CONFIG = require("./config/config");
const connectToDb = require("./db/mongodb");

//Routes
const bookRoutes = require("./routes/books");

const app = express();

// Add middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("hello book store!");
});

//Error handler Middleware
app.use((err, req, res, next) => {
  console.log(err.message);
  const errorStatus = err.status || 500;
  res.status(errorStatus).send(err.message);
});

connectToDb();
app.listen(CONFIG.PORT, () => {
  console.log(`server running on http://localhost:${CONFIG.PORT}`);
});
