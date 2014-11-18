'use strict';

/**
 * @ngdoc function
 * @name manageBandApp.controller:SessionsCtrl
 * @description
 * # SessionsCtrl
 * Controller of the manageBandApp
 */
angular.module('manageBandApp')
  .controller('SessionsCtrl', function ($scope, $auth, $state, flash) {

    $scope.logInForm = {
      email: '',
      password: ''
    };

    $scope.error = '';

    $scope.logIn = function() {
      $auth.submitLogin($scope.logInForm)
        .then(function(response) {})
        .catch(setErrorMessageFromResponse);
    };

    $scope.$on('auth:login-success', function(ev, user) {
      flash.success = "You have been logged in.";
      $state.go('main');
    });

    $scope.$on('auth:login-error', function(ev, reason) {
      setErrorMessageFromResponse(reason);
    });

    var setErrorMessageFromResponse = function(response) {
      $scope.error = 'Error: ' + response.errors[0];
    };

  });
