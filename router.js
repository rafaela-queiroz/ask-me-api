const express = require("express");
const router = express.Router();
const authentication = require("./modules/authentication");
const questions = require("./modules/questions");

router.get("/", (req, res) => {
  return res.json({ message: "OK" });
});

router.use(authentication);
router.use(questions);

module.exports = router;
