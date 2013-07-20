// Boilerplate Document Schema
var mongoose = require('mongoose');

module.exports =  new mongoose.Schema({
	typ: String,
	title: String,
	author: {},
	summary: String,
	body: String,
	created_at: { type: Date, 'default': Date.now }
});