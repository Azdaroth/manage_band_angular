'use strict';

/**
 * @ngdoc function
 * @name manageBandApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the manageBandApp
 */
angular.module('manageBandApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
