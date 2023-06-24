const cors = require('cors');  // add at the top 
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');


var eventsRouter = require('./routes/events');
var friendsRouter = require('./routes/friends');
var participationRouter = require('./routes/participation');
var usersRouter = require('./routes/users');

var app = express();

 
app.use(cors());  // add after 'app' is created 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: '50mb' }));



app.use('/api/events', eventsRouter);
app.use('/api/friends', friendsRouter);
app.use('/api/participation', participationRouter);
app.use('/api/users', usersRouter);


module.exports = app;
