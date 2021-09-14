const AWS = require('aws-sdk');
const SES = new AWS.SES({ region: 'ap-south-1' });
module.exports = SES;
async function sendMail(senderMail, token) {
    console.log("mail ", senderMail);
    const verifyLink = `${process.env.baseUrl}/verifyEmail/?token=${token}`;
    const params = {
        Destination: {
            ToAddresses: [senderMail],
        },
        Message: {
            Body: {
                Text: { Data: verifyLink },
            },
            Subject: { Data: "Verification Mail" },
        },
        Source: process.env.senderMail
    }
    try {
        const sesResponse = await SES.sendEmail(params).promise();
        console.log(sesResponse);
        return sesResponse;
    }
    catch (err) {
        console.log("there was an error sending the mail", err);
        return err;
    }
}

module.exports = sendMail






