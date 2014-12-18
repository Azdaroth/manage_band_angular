'use strict';

/**
 * @ngdoc directive
 * @name manageBandApp.directive:createTask
 * @description
 * # createTask
 */
angular.module('manageBandApp')
  .directive('createTask', function (Task, $rootScope) {
    return {
      template:
      '<div class="create-task">' +
        '<form novalidate name="newTaskForm" ng-submit="createTask()">' +
          '<div class="form-group">' +
            '<label>Create new task list</label>' +
            '<input type="text" class="form-control" ng-model="newTask.name" name="new_task_name" required="required" />' +
          '</div>' +
          '<button type="submit" class="btn btn-primary" ng-disabled="newTaskForm.$invalid">Add</button>' +
        '</form>' +
        '<hr />' +
      '</div>',
      restrict: 'E',
      scope: {
        band: '=',
        taskList: '='
      },
      link: function postLink(scope, element, attrs) {

        var loadNewTask = function() {
          scope.newTask = {
            name: ''
          };
        };
        loadNewTask();

        scope.createTask = function() {
          Task.create(scope.band, scope.taskList, scope.newTask).then(function(response) {
            scope.taskList.tasks.push(response.task);
            loadNewTask();
            $rootScope.$broadcast('reload-task-list', scope.taskList);
          });
        };

      }
    };
  });
