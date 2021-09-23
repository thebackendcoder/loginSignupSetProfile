const bcrypt = require('bcryptjs');
const model = require('../mongoSchema/mongoSchema');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;

async function loginUser(req, res) {
    const { userId, password } = req.body;
    try {
        const user = await model.credModel.findOne({ userId }).lean();
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({
                // eslint-disable-next-line no-underscore-dangle
                id: user._id,
                userId: user.userId
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
    catch (err) {
        let errr = JSON.stringify(err);
        res.status(400).json(errr);
    }
}



module.exports = loginUser