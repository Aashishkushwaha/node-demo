const fs = require("fs");

const rs = fs.createReadStream("./files/lorem.txt", { encoding: "utf8" });

const ws = fs.createWriteStream("./files/newLorem.txt");

// rs.on("data", (dataChunk) => {
//   console.log(`\nlength: ${dataChunk.length}`);
//   console.log(`\n${dataChunk}`);
//   ws.write(dataChunk);
// });

// writing large files using large files
rs.pipe(ws);
