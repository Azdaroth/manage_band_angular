'use strict';

/**
 * @ngdoc function
 * @name manageBandApp.controller:AssetCtrl
 * @description
 * # AssetCtrl
 * Controller of the manageBandApp
 */
angular.module('manageBandApp')
  .controller('AssetCtrl', function ($scope, $stateParams, Band, AssetList, Asset) {

    Band.find($stateParams.bandId).then(function(band) {
      $scope.band = band;
      AssetList.find(band, $stateParams.assetListId).then(function(assetList) {
        $scope.assetList = assetList;
        Asset.find(band, assetList, $stateParams.id).then(function(asset) {
          $scope.asset = asset;
        });
      });
    });

  });
