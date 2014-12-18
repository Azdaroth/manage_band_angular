'use strict';

describe('Controller: NewtaskctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('manageBandApp'));

  var NewtaskctrlCtrl,
      scope,
      stateParams,
      Band,
      TaskList,
      taskList,
      band;

  band = {
    id: "1"
  };

  taskList = {
    id: "2"
  };

  stateParams = {
    bandId: "1",
    taskListId: "2"
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q, _Band_, _TaskList_) {
    scope = $rootScope.$new();
    Band = _Band_;
    TaskList = _TaskList_;
    spyOn(Band, 'find').andCallFake(function (id) {
      var deferred = $q.defer();
      deferred.resolve(band);
      return deferred.promise;
    });
    spyOn(TaskList, 'find').andCallFake(function(band, id) {
      var deferred = $q.defer();
      deferred.resolve(taskList);
      return deferred.promise;
    });
    NewtaskctrlCtrl = $controller('NewTaskCtrl', {
      $scope: scope,
      $stateParams: stateParams,
      Band: Band,
      TaskList: TaskList
    });
    scope.$digest();
  }));

  it('assigns band', function () {
    expect(scope.band).toEqual(band);
    expect(Band.find).toHaveBeenCalledWith("1");
  });

  it('assigns task list after finding a band ', function () {
    expect(scope.taskList).toEqual(taskList);
    expect(TaskList.find).toHaveBeenCalledWith(band, "2");
  });
});
