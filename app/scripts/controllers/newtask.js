'use strict';

/**
 * @ngdoc function
 * @name manageBandApp.controller:NewtaskctrlCtrl
 * @description
 * # NewtaskctrlCtrl
 * Controller of the manageBandApp
 */
angular.module('manageBandApp')
  .controller('NewTaskCtrl', function ($scope, $stateParams, Band, TaskList) {

    Band.find($stateParams.bandId).then(function(band) {
      $scope.band = band;
      TaskList.find(band, $stateParams.taskListId).then(function(taskList) {
        $scope.taskList = taskList;
      })
    });

  });
