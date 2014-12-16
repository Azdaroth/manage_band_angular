'use strict';

/**
 * @ngdoc directive
 * @name manageBandApp.directive:taskLists
 * @description
 * # taskLists
 */
angular.module('manageBandApp')
  .directive('taskList', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the taskLists directive');
      }
    };
  });
