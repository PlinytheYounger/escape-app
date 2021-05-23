const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  getProfile
};

  async function signup(req, res) {
    console.log(req.body)
    const user = new User(req.body);
    try {
      await user.save();
      const token = createJWT(user);
      res.json({token});
    } catch (err) {
      console.log(err)
      res.status(400).json(err);
    }
  }

  function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
  }

async function login(req, res) {
  console.log(req.body)
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        console.log(err);
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    console.log(err)
    return res.status(401).json(err);
  }
}


function getProfile(req, res) {
  User.findById(req.params.id).populate('trip_ids').exec(function(err, foundUser) {
    res.json(foundUser);
  })
}