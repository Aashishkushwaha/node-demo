const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(401).json({ msg: "Please provide all details" });

  const user = userDB.users.find((user) => user.username === username);

  if (!username) return res.status(401).json({ msg: `Invalid credentials` }); // Unauthorized

  const match = await bcrypt.compare(password, user?.password || "");
  if (!match) return res.status(401).json({ msg: `Invalid credentials` });

  return res.json({ msg: "Login success" });
};

module.exports = {
  handleLogin,
};
