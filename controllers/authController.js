const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(401).json({ msg: "Please provide all details" });

  const user = userDB.users.find((user) => user.username === username);

  if (!user) return res.status(401).json({ msg: `Invalid credentials` }); // Unauthorized

  const match = await bcrypt.compare(password, user?.password || "");
  if (!match) return res.status(401).json({ msg: `Invalid credentials` });

  // create
  const accessToken = jwt.sign(
    { username: user?.username || "" },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30s" }
  );
  const refreshToken = jwt.sign(
    { username: user?.username || "" },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  // saving refreshToken with current user
  const otherUsers = userDB.users.filter(
    (person) => person.username != (user?.username || username)
  );
  const currentUser = { ...user, refreshToken };
  userDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(userDB.users)
  );
  res.cookie("jwt", refreshToken, {
    httpOnly: true, // httpOnly - not accessible by javascript
    maxAge: 24 * 60 * 60 * 100, // 1 day,
    sameSite: "none",
    // secure: true,
  });
  return res.json({ msg: "Login success", token: accessToken });
};

module.exports = {
  handleLogin,
};
