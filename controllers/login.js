const bcrypt = require('bcryptjs');
const model = require('../mongoSchema/mongoSchema');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;

async function loginUser(req, res) {
    const { userId, password } = req.body;
    try {
        const profileUser = await model.profileModel.findOne({ userId }).lean();
        if (await bcrypt.compare(password, profileUser.password)) {
            const token = jwt.sign({
                // eslint-disable-next-line no-underscore-dangle
                id: profileUser._id,
            }, jwtSecret);
            console.log('the token is ', token);
            res.status(200).json({
                message: "successfully LoggedIn",
                token,
            });
        } else {
            res.status(400).json({
                message: 'invalid  user credential',
            });
        }
    }
    catch (err) {
        let errr = JSON.stringify(err);
        res.status(400).json(err);
    }
}



module.exports = loginUser