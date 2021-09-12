const mongoose = require('mongoose');

const userCred = new mongoose.Schema({
    email:{type: String, required: true, unique: true},
    password: {type :String,require: true },
    mailVerified:{type : Boolean}
},{ collection: "usercredential" })

const userProfile = new mongoose.Schema({
    name: { type: String, required: true },
    surname :{type: String},
    contactNumber: {type: Number },
    age: { type: Number},
    company:{type: String},
    workExperience :{type: Number},
    designation:{ type: String, },
    techStack:{type: Array},
    userId: { type: String, unique: true },
    email: { type : String}
}, { collection: "userProfile" });


const credModel = mongoose.model('usercredential', userCred);
const profileModel = mongoose.model('userProfile', userProfile);
module.exports= {
    credModel, profileModel
}