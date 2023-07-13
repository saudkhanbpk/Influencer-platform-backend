const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const router = require ("./db/routes/Router") ;
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const db = mongoose.connection;
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL)
db.on('error', console.error.bind(console, 'mongoose connection error'))
db.once('open', function () {
    console.log('Database Connected');
    
});
app.use("/api",router);
app.listen(process.env.PORT || 5001, () => {
    console.log('Listening on port');

})