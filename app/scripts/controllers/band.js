'use strict';

/**
 * @ngdoc function
 * @name manageBandApp.controller:BandCtrl
 * @description
 * # BandCtrl
 * Controller of the manageBandApp
 */
angular.module('manageBandApp')
  .controller('BandCtrl', function ($scope, $stateParams, Band, AssetList, Asset) {

    Band.find($stateParams.id).then(function(band) {
      $scope.band = band;
      AssetList.all(band).then(function(assetLists) {
        $scope.assetLists = assetLists
      });
    });

    $scope.assetChanged = function(assetList, assetsTree) {
      Asset.link($scope.band, assetList, assetsTree);
    };

  });
