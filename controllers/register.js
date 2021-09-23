const bcrypt = require('bcryptjs');
const model = require('../mongoSchema/mongoSchema');
const mailService = require('../services/simpleMail');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;

async function registerUser(req, res) {
  let {email,userId,password } = req.body;
  password = await bcrypt.hash(password, 10);
  try {
    const dbResponse = await model.credModel.create({
      userId,
      password,
    })
    const token = jwt.sign({
      email,
      password
    }, jwtSecret);
    const dbResponse1 = await model.profileModel.create({
        email: email,
        userId: userId,
        mailVerified: false 
    })
    const sesResponse = await mailService(email, token);
    console.log(sesResponse);
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