const express = require('express');
const register = require('./controllers/register')
const login = require('./controllers/login');
const setProfile = require('./controllers/setprofile');
const isVerified = require('./services/isVerified')


const router = express.Router();
async function baseRoute(req, res){
    res.status(200).json({
        message:"base route working"
    })
}
router.get('/', baseRoute);
router.post('/registerUser', register);
router.post('/loginUser', isVerified, login);
router.post('/setProfile', setProfile);

module.exports= router;
