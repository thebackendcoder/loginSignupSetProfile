const model = require('../mongoSchema/mongoSchema')
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.jwtSecret;

async function setProfile(req, res) {
    try {
        let token= req.header('auth-token');
        let { name, surname, age, contactNumber, company, workExperience, designation, techStack } = req.body;
        const user = jwt.verify(token, jwtSecret);
        const _id = user.id;
        const dbResponse = await model.profileModel.updateOne({ _id }, {
            $set: {
                name,
                surname,
                contactNumber,
                age,
                company,
                workExperience,
                designation,
                techStack
            }
        })
        res.status(200).json({
            "message": "profile succesfully created"
        })
        console.log("no erroro");
        console.log(dbResponse);
    }
    catch (err) {
        console.log(err)
        if (err.message === 'invalid signature') {
            res.status(400).json({
                message: 'in valid token'
            })
        }
        if (err.message === 'jwt expired') {
            res.status(400).json({
                message: 'token Expired'
            })
        } else {
            res.status(400).json({
                message: err
            })
        }
    }
}

module.exports = setProfile