const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenvJSON = require('dotenv-json');
const cors = require('cors');
const connectwithMongo = require('./modules/mongoConnect');
const router = require('./router.js')

const env = process.env.NODE_ENV || 'local';
const port = process.env.PORT || 8000;
dotenvJSON({ path: `./config.${env}.json` });


app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.disable('x-powered-by');
app.use(cors());

//making connection with mongoDb

connectwithMongo()

app.use('/', router);

app.get('*', (req, res) => {
    res.status(404).json({
        message:"bad Request"
    });
});

app.listen(port, () => {
    console.log("listing")
})