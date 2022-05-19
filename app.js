var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/entries");

var app = express();

const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://127.0.0.1:27017", {
  useUnifiedTopology: true,
}).then((client) => {
  console.log("Vi är uppkopplade mot databasen!");

  const db = client.db("diary");
  app.locals.db = db;
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../DynamWebOvning5-front")));

app.use("/", indexRouter);
app.use("/entries", usersRouter);

module.exports = app;
