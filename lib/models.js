/** causio - models.js
	@author Shawn Marincas
	@company NinjaStack, Inc.
	@license Private
	@description 
		Handles opening and closing connections and building Models from Schemas
		Encapsulates Mongoose connection, provides direct access to Mongoose Models and provides helper/currying methods for common mongoose methods
*/

var mongoose = require('mongoose'),
	
	Q = require('q'),
	_ = require('underscore')._,

	// Mongoose Schemas
	Recipe = require(__dirname + "/schemas/Recipe"),
	Video = require(__dirname + "/schemas/Video"),
	
	// Document = require(__dirname + '/schemas/Document'),

	connStr, opened;

// Export object with simple connection methods and attached Mongoose Models
module.exports = {
	// Mongoose Models
	'Recipe': mongoose.model('recipes', Recipe),
	'Video': mongoose.model('videos', Video),
	// 'Document': mongoose.model('docs', Document),

	// Mongoose Connection Methods
	'getConnectionString': function() {
		return connStr;
	},
	'opened': function(cb) {
		mongoose.connection.on('open',cb);
	},
	'open': function(cnnstr) {
		var deferred = Q.defer(),
			db = mongoose.connection;

		connStr = cnnstr;

		mongoose.connect(connStr, { auto_reconnect: true });

		db.on('error',console.error.bind(console,'connection error:'));

		db.once('open',deferred.resolve);
		db.once('error',deferred.reject);

		return deferred.promise;
	},
	'close': function() {
		mongoose.connection.close();
	}
};
