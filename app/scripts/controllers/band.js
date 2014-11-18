'use strict';

/**
 * @ngdoc function
 * @name manageBandApp.controller:BandCtrl
 * @description
 * # BandCtrl
 * Controller of the manageBandApp
 */
angular.module('manageBandApp')
  .controller('BandCtrl', function ($scope, $stateParams, Band) {

    Band.find($stateParams.id).then(function(band) {
      $scope.band = band;
    });

  });
