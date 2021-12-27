const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ msg: "Please provide all details" });

  // check for duplicate usernames in db
  const foundUser = userDB.users.find((user) => user.username === username);

  if (foundUser)
    return res
      .status(409)
      .json({ msg: `user with username '${username}' already exists` });

  try {
    // encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser = {
      username,
      password: hashedPassword,
    };

    // store the user
    userDB.setUsers([...userDB.users, newUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );
    console.log(userDB.users);
    return res
      .status(200)
      .json({ msg: "User account successfully created", user: newUser });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  handleNewUser,
};
