// allow cors - Cross Origin Resource Sharing
const whitelistOrigins = [
  "https://www.yoursite.com",
  "http://localhost:3000",
  "http://localhost:3500", // we're using currently
  "http://127.0.0.1:5000",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelistOrigins.includes(origin) || !origin) {
      // cb(errorParam, allowed)
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
