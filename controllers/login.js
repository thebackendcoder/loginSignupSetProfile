const bcrypt = require('bcryptjs');
const model = require('../mongoSchema/mongoSchema');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;

async function loginUser(req, res) {
    const { email, password } = req.body;
    const user = await model.credModel.findOne({ email }).lean();
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({
            // eslint-disable-next-line no-underscore-dangle
            id: user._id,
            username: user.email,
        }, jwtSecret);
        console.log('the token is ', token);
        res.status(200).json({
            message: "successfullyLoggedIn",
            token,
        });
    } else {
        res.status(400).json({
            message: 'inavlid  user credential',
        });
    }
}

module.exports = loginUser