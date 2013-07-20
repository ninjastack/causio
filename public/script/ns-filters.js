/** {{ appname }} - ns-filters.js
	@author {{ author }}
	@company {{ company }}
	@license Private
	@description 
		NinjaStack All-Purpose Angular Filters
*/
angular
.module('nsFilters', [])
.filter('datetime', function() {
	return function(input,dt) {
		return dt ? new Date(dt) : new Date();	
	};
}).filter('otherwise', function() {
	return function(input, dflt) {
		return ((input != null) && (typeof input !== 'undefined') && ((input.length>0) || angular.isNumber(input))) ? input : (dflt || '');
	};
}).filter('prependArrayWith', function() {
	return function(input, dflt) {
		return angular.isArray(dflt) ? dflt.concat(input) : [dflt].concat(input);
	};
}).filter('isEqual', function() {
	return function(input,check,strict) {
		return strict ? ( input === check ) : ( input == check);
	}
}).filter('isNotEqual', function() {
	return function(input,check,strict) {
		return strict ? ( input !== check ) : ( input != check);
	}
}).filter('isEmpty', function() {
	return function(input) {
		return (_.isArray(input) || _.isString(input)) && input.length<1;
	}
}).filter('isNotEmpty', function() {
	return function(input) {
		return (_.isArray(input) || _.isString(input)) && input.length>0;
	}
});