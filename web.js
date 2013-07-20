/** causio - web.js
	@author Shawn Marincas
	@company NinjaStack, Inc.
	@license Private
	@description 
		Web server application code
*/
"use strict";

var express = require('express'),
	Q = require('q'),
	_ = require('underscore')._,
	MongoStore = require('connect-mongo')(express),

	port = process.env.PORT || 5000,

	models = require(__dirname+'/lib/models'),
	controls = require(__dirname+'/lib/controls')(models),
	route = require(__dirname+'/lib/route'),

	mongourl = process.env['MONGOHQ_URL'] ||  'mongodb://localhost/causio',

	app = module.exports = express();

// Express Configuration and Middleware Stack
app.configure(function(){
	// Use consolidate.js QEJS adapter as engine for ejs templates
	app.engine('ejs', require('consolidate').qejs);

	// Use EJS engine
	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/views');

	// Static Stuff
	app.use(express.static(__dirname + '/public'));
	app.use(express.favicon(__dirname + '/public/favicon.ico'));

	// Sessions and Cookies
	app.use(express.cookieParser());
	app.use(
		express.session({
			store: new MongoStore({
				url: mongourl,
				auto_reconnect: true
			}),
			secret: '!causio_4549403$!'
		})
	);

	// parse request bodies (req.body)
	app.use(express.bodyParser());

	// Handling flash variables and putting session user and other stuff in to locals
	app.use(function(req, res, next) {
		// The Response Stash where we keep all our valuables along the Control/Model Pipeline
		res.locals.stash = {};

		// Simple flash messages
		res.locals.flash = req.session.flash;
		if(res.locals.flash) {
			delete req.session.flash;
		}

		next();
	});

	// The router
	app.use(app.router);

	// assume 404 since no other middleware responded
	app.use(function(req,res,next) {
		res.status(404).render('layout', { tmpl: 404, url: req.originalUrl });
	});

	// Server error handling comes last
	app.use(function(err, req, res, next){
		console.error(err.stack);
		res.status(500).render('layout', { tmpl: 500, msg: 'causio Server Error, terribly sorry, please try again in a couple minutes.' });
	});
});

// Dev environment configuration, not really in use yet...
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Production environment configuration, not really in use yet...
app.configure('production', function(){
  app.use(express.errorHandler());
});

// route controls
route(app, controls);

// Open Mongo connection so we're good to go when requests come in
models.open(mongourl).then(function() {
	console.log('app connected to mongo');

	// Start listening for requests
	app.listen(port);
	console.log('\nlistening on port ' + port);
}, function(err) {
	console.log('error connecting to mongo:',err);
});