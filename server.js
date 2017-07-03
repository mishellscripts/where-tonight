'use strict';

const express = require('express');
const routes = require('./app/routes/index.js');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: 'https://wheretonight-mishellscripts.c9users.io'}));


app.set('view engine', 'pug');
app.set('views', __dirname + '/public')

routes(app, passport);

const port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});

/*
var Bar = require('./app/models/bars.js');
var User = require('./app/models/users.js');
User.remove({}, function(err) { 
   console.log('collection removed') 
});

Bar.remove({}, function(err) { 
   console.log('collection removed') 
});*/