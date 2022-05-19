var express = require("express");
const app = require("../app");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  req.app.locals.db
    .collection("diary")
    .find()
    .toArray()
    .then((results) => {
      res.send(results);
    });
});

router.post("/add", (req, res) => {
  req.app.locals.db
    .collection("diary")
    .insertOne(req.body)
    .then((result) => {
      console.log("resault", result);
      res.redirect("/");
    });
});

module.exports = router;
