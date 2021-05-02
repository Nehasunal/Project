const express = require('express');

const path = require('path');
const router = express.Router();
const multer = require('multer');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 3000;
const cors = require('cors')
const jwt=require('jsonwebtoken');



// app.use(cors())
app.use(cors({origin: "http://localhost:4200",credentials: true }));

const api = require('./routes/api');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

//Router checking in router file
app.use('/api', api);


//checking
app.get('/', (req, res, next) => res.send('Hello World!'));



app.listen(port, () => console.log(`Node app listening on port ${port}!`));



module.exports = router;
