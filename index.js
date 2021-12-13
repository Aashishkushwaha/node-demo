const logEvents = require("./logEvents");

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

// initialize object
const myEmitter = new MyEmitter();

// add listener for log event
myEmitter.on("log", (msg) => logEvents(msg));

setTimeout(() => {
  // Emit Event
  myEmitter.emit("log", "Hello Aashish, this is the first log emitted");
}, 2000);
