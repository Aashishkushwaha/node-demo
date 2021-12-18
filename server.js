const path = require("path");
const express = require("express");
const app = express();

const PORT = process.env.PORT | 3500;

app.get("^/$|index(.html)?", (req, res) => {
  // first way to send file
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  // other way to send file to server
  res.sendFile("./views/new-page.html", { root: __dirname });
});

app.get("/old-page(.html)?", (req, res) => {
  // 301 - moved permanently
  // 302 - a page has moved, but only temporarily
  res.redirect(301, "/new-page"); // by default status will be 302;
});

// Route handlers
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to load hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello world for hello.html");
  }
);

const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res) => {
  console.log("three");
  res.send("finished");
};

// app.get("/chain(.html)?", [one, two, three]);
app.get("/chain(.html)?", one, two, three);

app.get("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
