const model = require('../mongoSchema/mongoSchema');
async function isVerified(req, res, next) {

    const { userId, password } = req.body;
    const user = await model.profileModel.findOne({ userId }).lean();
    if (!user) {
        res.status(404).json({ message: 'this user doesnt exist' });
    }
    if (!user.mailVerified) {
        res.status(400).json({
            "message": "Please verify the link sent to mail account"
        })
    }
    else {
        next();
    }
}

module.exports = isVerified