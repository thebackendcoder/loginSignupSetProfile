const jwt = require('jsonwebtoken')
const jwtSecret = process.env.jwtSecret;
const model = require('../mongoSchema/mongoSchema');

async function mailVerified(req, res) {
    const token = req.query.token;
    try {
        const user = jwt.verify(token, jwtSecret);
        const email = user.email;

        const userResponse = await model.credModel.updateOne({ email }, {
            $set: {
                mailVerified: true
            }
        })
        console.log(userResponse);
        res.status(200).json({
            message: "you have successfully veryfied the link"
        })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            err
        })
    }
}

module.exports= mailVerified;