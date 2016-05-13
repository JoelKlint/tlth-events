var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var conf = require('./config/config');

mongoose.connect(conf.mongoDbURI);
var port = 3000;
var app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
	var time = new Date();
	console.log(time.toString());
	console.log(req.ip);
	console.log(req.method + ' ' + req.originalUrl);
	console.log();
	next();
})

var CASAuthentication = require('cas-authentication');



var session = require('express-session')

app.use( session({
    secret            : 'super secret key',
    resave            : false,
    saveUninitialized : true
}));

var cas = new CASAuthentication({
    cas_url     : 'https://cas.lu.se/cas',
    service_url : 'http://localhost:3000',
		cas_version     : '2.0',
		renew           : false,
    is_dev_mode     : false,
    dev_mode_user   : '',
    dev_mode_info   : {},
    session_name    : 'cas_user',
    session_info    : 'cas_userinfo',
    destroy_session : false
});

// Routing
var events = require('./routes/events');
app.use('/events', events);

var icalEvents = require('./routes/ical-events');
app.use('/ical-events', icalEvents);

var users = require('./routes/users');
app.use('/users', users);

var guilds = require('./routes/guilds');
app.use('/guilds', guilds);


app.get('/login', cas.bounce, function(req, res) {
	res.send(req.session.cas_user);
});

app.get('/hej', cas.block, function(req, res) {
	res.send(req.session);
});

app.use(express.static('app'));

import TempComp from './views/TempComp.js';
import React from 'react';
import { renderToString } from 'react-dom/server'
import configureStore from './store/configureStore.jsx';
app.get('/', function(req, res) {
	const store = configureStore();
	const html = renderToString(<TempComp store={store}/>);
	console.log(html);
	res.send(`
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="view">${html}</div>
        <script src="js/index.js"></script>
      </body>
    </html>
    `);


	// res.render('index.html');

})

// Error handling Middleware
// Must be declared last so it can handle errors after they happen
var errorHandler = require('./config/errorHandler');
app.use(errorHandler);

// Start server
app.listen(port);
console.log('Server is listening on port ' + port );
