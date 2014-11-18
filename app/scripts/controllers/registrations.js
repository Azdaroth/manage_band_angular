'use strict';

/**
 * @ngdoc function
 * @name manageBandApp.controller:RegistrationsCtrl
 * @description
 * # RegistrationsCtrl
 * Controller of the manageBandApp
 */
angular.module('manageBandApp')
  .controller('RegistrationsCtrl', function ($scope, $auth, $state) {

    $scope.registrationForm = {
      email: '',
      band_name: '',
      password: '',
      password_confirmation: ''
    };

    $scope.error = '';

    $scope.register = function() {
      $auth.submitRegistration($scope.registrationForm);
    };

    $scope.$on('auth:registration-email-success', function(ev, message) {
      $state.go('main');
    });

    $scope.$on('auth:registration-email-error', function(ev, reason) {
      setErrorMessageFromResponse(reason);
    });

    var setErrorMessageFromResponse = function(response) {

      var errors = Object.keys(response.errors.full_messages).map(function(idx) {
        return response.errors.full_messages[idx];
      }).join(', ');
      $scope.error = 'Error: ' + errors;
    };

  });
