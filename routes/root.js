const router = require("express").Router();
const path = require("path");

router.get("^/$|index(.html)?", (req, res) => {
  // first way to send file
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/new-page(.html)?", (req, res) => {
  // other way to send file to server
  res.sendFile("/views/new-page.html", { root: `${__dirname}/..` });
});

router.get("/old-page(.html)?", (req, res) => {
  // 301 - moved permanently
  // 302 - a page has moved, but only temporarily
  res.redirect(301, "/new-page"); // by default status will be 302;
});

module.exports = router;
