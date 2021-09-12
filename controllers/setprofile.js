const model = require('../mongoSchema/mongoSchema')
const dotenvJSON = require('dotenv-json');  // under observation? do we need in everyfile 
const env = process.env.NODE_ENV || 'local'; // under observation ? same   
dotenvJSON({ path: `./config.${env}.json` });  // under observation? same
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.jwtSecret;

async function setProfile(req, res) {
    console.log("i am hit")
    try {
        let { token, name, surname, age, contactNumber, company, workExperience, designation, techStack } = req.body;
        const user = jwt.verify(token, jwtSecret);
        const userId = user.id;
        const email = user.username;
        const dbResponse = await model.profileModel.create({
            name,
            surname,
            age,
            contactNumber,
            company,
            workExperience,
            designation,
            techStack,
            userId,
            email
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