'use strict';

/**
 * @ngdoc directive
 * @name manageBandApp.directive:ngReallyClick
 * @description
 * # ngReallyClick
 */
angular.module('manageBandApp')
  .directive('ngReallyClick', function () {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.on('click', function() {
          var message = attrs.ngReallyMessage;
          if (message && confirm(message)) {
            scope.$apply(attrs.ngReallyClick);
          }
        });
      }
    }
  });
