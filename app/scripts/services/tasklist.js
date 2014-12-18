'use strict';

/**
 * @ngdoc service
 * @name manageBandApp.TaskList
 * @description
 * # TaskList
 * Factory in the manageBandApp.
 */
angular.module('manageBandApp')
  .factory('TaskList', function (Restangular) {

    var all = function(band) {
      return Restangular.one('bands', band.id)
                        .all('task_lists')
                        .getList();
    };

    var find = function(band, id) {
      return Restangular.one('bands', band.id)
                        .one('task_lists', id)
                        .get();
    };

    var create = function(band, params) {
      return Restangular.one('bands', band.id)
                         .all('task_lists')
                         .post({"task_list": params});
    }

    var update = function(band, assetList, params) {
      return Restangular.one('bands', band.id)
                        .one('task_lists', assetList.id)
                        .patch({"task_list": params});
    };

    var destroy = function(band, assetList) {
      return Restangular
        .one('bands', band.id)
        .one('task_lists', assetList.id)
        .remove();
    };

    return {
      all:  all,
      find: find,
      create: create,
      update: update,
      destroy: destroy
    };

  });
