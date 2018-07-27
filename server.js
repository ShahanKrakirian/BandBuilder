const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const mongoose = require('mongoose');
const cors = require('cors');
var session = require('express-session');

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
  }))

app.use(flash());
app.use(bodyParser.json());
app.use(express.static( __dirname + '/public/dist/public/'));

require('./server/config/mongoose');

require('./server/config/routes')(app);

var server = app.listen(6789, () => {
    console.log("Listening on 6789");
})

