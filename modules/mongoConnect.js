const mongoose = require('mongoose');

async function connectwithMongo(app) {

    const dbString = process.env.dbString;
    console.log(dbString);
    const res = mongoose.connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then((val => {
        console.log("connection establish to the database");
    }));
}


module.exports = connectwithMongo