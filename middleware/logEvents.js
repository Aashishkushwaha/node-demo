const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const { format } = require("date-fns");
const fsPromises = require("fs").promises;

const logEvents = async (msg, fileName) => {
  const dateTime = format(new Date(), "yyyy-MM-dd  HH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${msg}\n`;
  console.log(logItem);

  if (!fs.existsSync(path.join(__dirname, "..", "logs")))
    await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
  else {
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", fileName),
      logItem
    );
  }
};

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLogs.txt");
  next();
};

module.exports = { logEvents, logger };
