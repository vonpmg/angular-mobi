angular.module('mobi.config', []).value('mobi.config', {});
angular.module('mobi.events', ['mobi.config']);
angular.module('mobi.swipe', ['mobi.config']);
angular.module('mobi.pinch', ['mobi.config']);
angular.module('mobi.rotate', ['mobi.config']);
angular.module('mobi', ['mobi.events', 'mobi.swipe', 'mobi.pinch', 'mobi.rotate']);

// Capitalize a String
var capitalize = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// Create a new Directive in the specified module
var createDirective = function (moduleName, eventName) {

	var directiveName = "mobi" + capitalize(eventName.toLowerCase());
	angular.module(moduleName)
		.directive(directiveName, ['$parse', function($parse) {
			return function(scope, elm, attr) {
				var fn = $parse(attr[directiveName]);
				$$(elm[0]).bind(eventName, function(event) {
					scope.$apply(function() {
						fn(scope, {$event: event});
					});
				});
			};
		}]);
};

/**
 * Loops thru the various passed directive names and assigns to `QuoJs` touch event
 */
angular.forEach('hold tap singleTap doubleTap'.split(' '), function(eventName) {
	createDirective ("mobi.events", eventName);
});

/**
 * Loops thru the various passed directive names and assigns to `QuoJs` swipe gesture
 */
angular.forEach('swipe swiping swipeLeft swipeRight swipeDown swipeUp'.split(' '), function(eventName) {
	createDirective ("mobi.swipe", eventName);
});

/**
 * Loops thru the various passed directive names and assigns to `QuoJs` pinch gesture
 */
angular.forEach('pinch pinching pinchIn pinchOut'.split(' '), function(eventName) {
	createDirective ("mobi.pinch", eventName);
});

/**
 * Loops thru the various passed directive names and assigns to `QuoJs` rotate gesture
 */
angular.forEach('rotate rotating rotateLeft rotateRight'.split(' '), function(eventName) {
	createDirective ("mobi.rotate", eventName);
});