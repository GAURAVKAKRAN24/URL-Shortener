const jwt = require("jsonwebtoken");
const secret = "gk@12345";

function setUser(user) {
  console.log("user in set user : ", user);
  return jwt.sign(
    {
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    secret
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  setUser,
  getUser,
};
