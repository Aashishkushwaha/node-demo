const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  // On client also delete the access token

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content (successful request)

  const refreshToken = cookies.jwt;

  // is refresh token in db ?
  const user = userDB.users.find((user) => user?.refreshToken === refreshToken);

  if (!user) {
    // erase cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.sendStatus(204); // No content
  }

  // Delete refresh token
  const otherUsers = userDB.users.filter(
    (person) => person?.refreshToken != user.refreshToken
  );
  const currentUser = { ...user, refreshToken: "" };
  userDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(userDB.users)
  );

  // secure: true - only server on https (for dev server it's not required)
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    // secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  return res.sendStatus(204);
};

module.exports = {
  handleLogout,
};
