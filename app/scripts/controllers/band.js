'use strict';

/**
 * @ngdoc function
 * @name manageBandApp.controller:BandCtrl
 * @description
 * # BandCtrl
 * Controller of the manageBandApp
 */
angular.module('manageBandApp')
  .controller('BandCtrl', function ($scope, $stateParams, Band, AssetList, Asset, TaskList, Task) {

    Band.find($stateParams.bandId).then(function(band) {
      $scope.band = band;
      AssetList.all(band).then(function(assetLists) {
        $scope.assetLists = assetLists
      });
      TaskList.all(band).then(function(taskLists) {
        $scope.taskLists = taskLists;
      });
    });

    $scope.assetChanged = function(assetList, assetsTree) {
      Asset.link($scope.band, assetList, assetsTree);
    };

    $scope.$on('reload-asset-list', function(ev, assetList) {
      AssetList.find($scope.band, assetList.id).then(function(reloadedAssetList) {
        var oldAssetList = _.where($scope.assetLists, { id: reloadedAssetList.id })[0];
        var indexOfOldAssetList = $scope.assetLists.indexOf(oldAssetList);
        $scope.assetLists[indexOfOldAssetList] = reloadedAssetList;
      });
    });

    $scope.$on('reload-task-list', function(ev, taskList) {
      TaskList.find($scope.band, taskList.id).then(function(reloadedTaskList) {
        var oldTaskList = _.where($scope.taskLists, { id: reloadedTaskList.id })[0];
        var indexOfOldTaskList = $scope.taskLists.indexOf(oldTaskList);
        $scope.taskLists[indexOfOldTaskList] = reloadedTaskList;
      });
    });

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

    $scope.sortableOptions = {
      connectWith: '.tasklist-tasks',
      placeholder: 'placeholder',
      beforeStop: function(event, ui) {
        var task = ui.helper.find('span').data('task');
        var listId = ui.helper.closest('.tasklist').data('task-list-id');
        Task.updateOnDrag($scope.band, listId, task, $scope.taskLists);
      }
    }

  });
