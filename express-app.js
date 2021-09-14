const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenvJSON = require('dotenv-json');

const env = process.env.NODE_ENV || 'local';
dotenvJSON({ path: `./config.${env}.json` });

const connectwithMongo = require('./modules/mongoConnect');
const router = require('./router.js')
const port = process.env.PORT || 8000;


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