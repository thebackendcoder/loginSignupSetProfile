const mongoose = require('mongoose');
const dotenvJSON = require('dotenv-json');  // under observation? do we need in everyfile 
const env = process.env.NODE_ENV || 'local'; // under observation ? same   
dotenvJSON({ path: `./config.${env}.json` });  // under observation? same

async function connectwithMongo() {

    const dbString = process.env.dbString;
    console.log(dbString);
    const res = mongoose.connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then((val => {
        console.log("connection establish to the database");
    }));
}


module.exports = connectwithMongo