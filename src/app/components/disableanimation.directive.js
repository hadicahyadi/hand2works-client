(function() {
	'use strict';

	angular
	.module('hand2worksBos')
	.directive('ngAnimationDisabled', function ($animate) {
		return {
			restrict: 'C',
			link: function (scope, element, attrs) {
				$animate.enabled(element, false);
			}
		};
	});

})();
