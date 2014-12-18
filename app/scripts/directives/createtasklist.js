'use strict';

/**
 * @ngdoc directive
 * @name manageBandApp.directive:createTaskList
 * @description
 * # createTaskList
 */
angular.module('manageBandApp')
  .directive('createTaskList', function (TaskList) {
    return {
      template:
      '<div class="create-task-list">' +
        '<form novalidate name="newTaskListForm" ng-submit="createTaskList()">' +
          '<div class="form-group">' +
            '<label>Create new task list</label>' +
            '<input type="text" class="form-control" ng-model="newTaskList.name" name="new_task_list_name" required="required" />' +
          '</div>' +
          '<button type="submit" class="btn btn-primary" ng-disabled="newTaskListForm.$invalid">Add</button>' +
        '</form>' +
        '<hr />' +
      '</div>',
      restrict: 'E',
      scope: {
        band: '=',
        taskLists: '='
      },
      link: function postLink(scope, element, attrs) {

        var loadNewTaskList = function() {
          scope.newTaskList = {
            name: '',
            tasks: []
          };
        };
        loadNewTaskList();

        scope.createTaskList = function() {
          TaskList.create(scope.band, scope.newTaskList).then(function(response) {
            scope.taskLists.push(response.task_list);
            loadNewTaskList();
          });
        };

      }
    };
  });
