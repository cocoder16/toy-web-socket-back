const express = require("express");
const fs = require("fs");

const router = express.Router();

// get api
fs.readdirSync(__dirname).forEach(file => {
  if (file === "index.js") return;
  require(`./${file.substr(0, file.indexOf("."))}`)(router);
});

module.exports = router;
