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

    $scope.calendar = {
      height: 450,
      editable: true,
      header:{
        left: 'month basicWeek basicDay agendaWeek agendaDay',
        center: 'title',
        right: 'today prev,next'
      },
      dayClick: $scope.alertEventOnClick,
      eventDrop: $scope.alertOnDrop,
      eventResize: $scope.alertOnResize
    };

    $scope.dragControlListeners = {
      accept: function (sourceItemHandleScope, destSortableScope) { return true },
      itemMoved: function (event) {},
      orderChanged: function(event) {}
    };

    $scope.eventSources = [];
    $scope.items = [ { name: "name" }, { name: "name 2" } ];

  });
