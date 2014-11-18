'use strict';

/**
 * @ngdoc function
 * @name manageBandApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the manageBandApp
 */

angular.module('manageBandApp')
  .controller('MainCtrl', function ($scope, $auth, Band) {

    $auth.validateUser().then(function(user) {
      if (user.id) {
        Band.all().then(function(bands) {
          $scope.bands = bands;
        });
      };
    });
  });
