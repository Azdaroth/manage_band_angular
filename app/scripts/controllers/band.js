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
      $scope.assetLists = [{
        name: "Asset List 1",
        assets: [
            {
              item: { text: 'name' },
              children: [
                {
                  item: { text: "name child 1" },
                  children: []
                },
                {
                  item: { text: "name child 2" },
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: "Asset List 2",
          assets: [
            {
              item: { text: 'name' },
              children: [
                {
                  item: { text: "name child 1" },
                  children: []
                },
                {
                  item: { text: "name child 2" },
                  children: []
                }
              ]
            }
          ]
        }
      ]
    });

    $scope.assetChanged = function(item) {
      console.log(item)
    };

  });
