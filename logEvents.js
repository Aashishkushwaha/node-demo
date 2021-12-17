const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const { format } = require("date-fns");
const fsPromises = require("fs").promises;

const logEvents = async (msg, fileName) => {
  const dateTime = format(new Date(), "yyyy-MM-dd  HH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${msg}\n`;
  console.log(logItem);

  if (!fs.existsSync(path.join(__dirname, "logs")))
    await fsPromises.mkdir(path.join(__dirname, "logs"));
  else {
    await fsPromises.appendFile(
      path.join(__dirname, "logs", fileName),
      logItem
    );
  }
};

module.exports = logEvents;
