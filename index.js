const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    console.log(data);
    await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"));
    await fsPromises.writeFile(
      path.join(__dirname, "files", "reply.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "reply.txt"),
      `\nAppended data: ${data}`
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "reply.txt"),
      path.join(__dirname, "files", "promiseComplete.txt")
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "promiseComplete.txt"),
      "utf8"
    );
    console.log(newData);
  } catch (error) {
    console.error(error);
  }
};

fileOps();

// read file
// fs.readFile("./files/starter.txt", "utf8", (err, data) => {
// fs.readFile(
//   path.join(__dirname, "files", "starter.txt"),
//   "utf8",
//   (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   }
// );

console.log("Hello world");

// write file
// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "This is the text i am writing to file",
//   (err) => {
//     if (err) throw err;
//     console.log("Writing to file completed");

//     // append file
//     fs.appendFile(
//       path.join(__dirname, "files", "reply.txt"),
//       "\n\nThis is the text using append operation.",
//       (err) => {
//         if (err) throw error;
//         console.log("Append operation successfully completed");

//         // rename file
//         fs.rename(
//           path.join(__dirname, "files", "reply.txt"),
//           path.join(__dirname, "files", "newReply.txt"),
//           (err) => {
//             if (err) throw error;
//             console.log("Rename operation successfully completed");
//           }
//         );
//       }
//     );
//   }
// );

// append file
// fs.appendFile(
//   path.join(__dirname, "files", "appendTest.txt"),
//   "This is the text using append operation.",
//   (err) => {
//     if (err) throw error;
//     console.log("Append operation successfully completed");
//   }
// );

// exit on uncaught errors
process.on("uncaughtException", (err) => {
  console.error("There was an error : ", err);
  process.exit(1);
});
