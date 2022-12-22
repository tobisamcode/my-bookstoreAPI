const mongoose = require("mongoose");
const CONFIG = require("../config/config");

function connectToDb() {
  mongoose.set("strictQuery", false);

  mongoose.connect(CONFIG.MONGO_URI);

  mongoose.connection.on("connected", () => {
    console.log("mongodb connected successfully");
  });

  mongoose.connection.on("error", error => {
    console.log("error ocurred during connection:", error);
  });
}

module.exports = connectToDb;
