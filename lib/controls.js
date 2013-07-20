/** causio - controls.js 
	@author Shawn Marincas
	@company NinjaStack, Inc.
	@license Private
	@description 
		Server control pipes which handles requests with models and eventually responds
*/
var _ = require('underscore')._,
	Q = require('q');

module.exports = function(models) {
	return {
		'render': function(view, req, res, next) {
			if(typeof view === 'string') {
				return res.render(view);
			}

			console.log('No template view file', req.path);
			return next();
		},
		'redirect': function(location, req, res, next) {
			if(typeof location !== 'string') {
				res.locals.error = { typ: 'error', title: 'Error Redirecting...', msg: 'Not sure what happend, we\'re looking in to it.' };
				return next('route');
			}

			res.redirect(location);
		},
		'json': function(req,res,next) {		
			var res = (typeof req === 'string') ? next : res,
				data = (typeof req === 'string') ? res.locals.stash[req] : res.locals.stash;

			res.json({ typ: 'success', data: data });
		},
		'error': function(req,res) {
			res.locals.error = res.locals.error || { typ: 'error', title: 'Unkown Error Ocurred.', msg: 'Not sure what happend, we\'re looking in to it.' };

			if(req.xhr) {
				res.render('500');
			} else {
				res.json(err);
			}
		}
	};
};
