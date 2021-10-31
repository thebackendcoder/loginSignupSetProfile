const mongoose = require('mongoose');

const userProfile = new mongoose.Schema({
    name: { type: String, },
    surname :{type: String},
    contactNumber: {type: Number},
    age: { type: Number},
    company:{type: String},
    workExperience :{type: Number},
    designation:{ type: String, },
    techStack:{type: Array},
    userId: { type: String, unique: true },
    email: { type : String, unique: true},
    password: {type :String,require: true },
    mailVerified:{type : Boolean}
}, { collection: "UserProfile" });

const profileModel = mongoose.model('userProfile', userProfile);
module.exports= {
    profileModel
}