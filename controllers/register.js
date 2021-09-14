const bcrypt = require('bcryptjs');
const model = require('../mongoSchema/mongoSchema');
const mailService = require('../services/simpleMail');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;

async function registerUser(req, res) {
  let { email, password } = req.body;
  password = await bcrypt.hash(password, 10);
  let mailVerified = false;
  try {
    const token = jwt.sign({
      email,
      password
    }, jwtSecret);
    const sesResponse = await mailService(email,token);
    console.log(sesResponse);
    const dbResponse = await model.credModel.create({
      email,
      password,
      mailVerified
    })
    res.status(200).json({
      messgage: "Please verify your mail by clicking the link sent to our account"
    });
  }
  catch (err) {
    if (err.code == 11000) {
      res.status(404).json({
        message: 'user exists'
      })
    }
    else {
      throw err;
    }
  }
}
module.exports = registerUser;