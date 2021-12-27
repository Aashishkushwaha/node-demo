const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const credentials = require("./middleware/credentials");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJwt");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT | 3500;

// custom Middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credential requirement
app.use(credentials);

// To handle CORS
app.use(cors(corsOptions));

// to handle form data
app.use(express.urlencoded({ extended: false }));
// middleware to handler json data
app.use(express.json());

// middleware for parsing cookies
app.use(cookieParser());

// middleware to serve static files
app.use(express.static(path.join(__dirname, "/public")));

// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/api/register"));
app.use("/auth", require("./routes/api/auth"));
app.use("/refresh", require("./routes/api/refresh"));
app.use("/logout", require("./routes/api/logout"));

// verify JWT before accessing any route of employee
app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

// router.use('/') => .use() doesn't accept regEx, it's mostly used for middlewares
// router.all('') => .all() accepts regEx & used routing
// router.get("*", (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// });
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "..", "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("text");
    res.send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
