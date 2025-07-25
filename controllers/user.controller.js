const { setUser } = require("../service/auth.service");
const User = require("./../models/user.model");

async function handleSignUp(req, res) {
  const { name, email, password } = req.body;
  const result = await User.create({
    name,
    email,
    password,
  });
  if (result) {
    res.send("Your request is submitted.");
  }
}

async function handleUserLogin(req, res) {
  const {email, password} = req.body;
  const user = await User.findOne({email, password})
  if(!user) res.render('login', {
    msg: 'Invalid userid or password'
  })
  const token = setUser(user);
  // res.json({token})
  res.cookie('token', token);
  return res.redirect('/')
}

module.exports = {
  handleSignUp,
  handleUserLogin
};
