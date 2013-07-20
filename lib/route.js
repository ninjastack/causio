/** causio - route.js
	@author Shawn Marincas
	@company NinjaStack, Inc.
	@license Private
	@description 
		Route requests through various Control and Model functions via the pattern matching on the request path
*/
module.exports = function(app, controls) {
	// GET Main HTML/Angular App Layout
	app.get('/', controls.render.bind(controls,'layout'));

	// Catch errors
	app.get('*', controls.error.bind(controls));
};