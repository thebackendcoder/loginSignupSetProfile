const mongoose = require('mongoose');

const userCred = new mongoose.Schema({
    userId:{type: String, required: true, unique: true},
    password: {type :String,require: true },
},{ collection: "usercredential" })

const userProfile = new mongoose.Schema({
    name: { type: String, },
    surname :{type: String},
    contactNumber: {type: Number },
    age: { type: Number},
    company:{type: String},
    workExperience :{type: Number},
    designation:{ type: String, },
    techStack:{type: Array},
    userId: { type: String, unique: true },
    email: { type : String},
    mailVerified:{type : Boolean}
}, { collection: "userProfile" });


const credModel = mongoose.model('usercredential', userCred);
const profileModel = mongoose.model('userProfile', userProfile);
module.exports= {
    credModel, profileModel
}