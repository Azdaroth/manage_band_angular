'use strict';

/**
 * @ngdoc service
 * @name manageBandApp.Task
 * @description
 * # Task
 * Factory in the manageBandApp.
 */
angular.module('manageBandApp')
  .factory('Task', function (Restangular) {
    var find = function(band, taskList, id) {
      return Restangular
        .one('bands', band.id)
        .one('task_lists', taskList.id)
        .one('tasks', id)
        .get();
    };

    var create = function(band, taskList, params) {
      return Restangular
        .one('bands', band.id)
        .one('task_lists', taskList.id)
        .all('tasks')
        .post({"task": params});
    };

    var update = function(band, taskList, task, params) {
      return Restangular
        .one('bands', band.id)
        .one('task_lists', taskList.id)
        .one('tasks', task.id)
        .patch({"task": params});
    };

    var destroy = function(band, taskList, task) {
      return Restangular
        .one('bands', band.id)
        .one('task_lists', taskList.id)
        .one('tasks', task.id)
        .remove();
    };

    return {
      find: find,
      create: create,
      update: update,
      destroy: destroy
    };
  });
