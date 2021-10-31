const jwt = require('jsonwebtoken')
const jwtSecret = process.env.jwtSecret;
const model = require('../mongoSchema/mongoSchema');

async function mailVerified(req, res) {
    const token = req.query.token;
    try {
        const user = jwt.verify(token, jwtSecret);
        const _id = user.id;
        const userResponse = await model.profileModel.updateOne({ _id }, {
            $set: {
                mailVerified: true
            }
        })
        console.log(userResponse);
        res.status(200).json({
            message: "you have successfully verified your email"
        })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            err
        })
    }
}

module.exports = mailVerified;