/** {{ appname }} - ns-directives.js
	@author {{ author }}
	@company {{ company }}
	@license Private
	@description 
		NinjaStack Angular Directives
*/
angular
.module('nsDirectives', [ 'nsServices' ])
.directive('toggleWhenPassed', [ '$window', 'AppState', 
	function($window, AppState) {
		// Linking function
		return function(scope,el,attrs) {
			var elTop = el.offset().top,
				topBuf = !isNaN(attrs.passBuffer) ? parseInt(attrs.passBuffer) : 0,
				win = angular.element($window).on('scroll', function() {
					scope.$apply(function() {
						AppState[attrs.toggleWhenPassed] = win.scrollTop() > (elTop + topBuf);
					});
				});
		};
	}
]);