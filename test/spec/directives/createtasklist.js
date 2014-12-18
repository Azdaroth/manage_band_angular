'use strict';

describe('Directive: createTaskList', function () {

  // load the directive's module
  beforeEach(module('manageBandApp'));

  var element,
      scope,
      TaskList,
      band,
      taskLists,
      newTaskList;

  band = {
    id: "1"
  }

  taskLists = [];

  newTaskList = {
    name: "name"
  };

  beforeEach(inject(function ($rootScope, $compile, _TaskList_, $q) {
    scope = $rootScope.$new();
    element = angular.element('<create-task-list band="band" task-lists="taskLists"></create-task-list>');
    TaskList = _TaskList_;
    spyOn(TaskList, 'create').andCallFake(function() {
      var deferred = $q.defer();
      deferred.resolve({ task_list: newTaskList });
      return deferred.promise;
    });
    scope.band = band;
    scope.taskLists = taskLists;
    element = $compile(element)(scope);
    scope.$digest();
  }));

  it('calls TaskList service to create task list', function() {
    element.isolateScope().createTaskList();
    expect(TaskList.create).toHaveBeenCalledWith(band, {name: '', tasks: [] });
  });

  it('adds task list to task lists on success of adding calling TaskList service', function () {
    element.isolateScope().createTaskList();
    scope.$digest();
    expect(scope.taskLists.length).toEqual(1);
    expect(scope.taskLists[0].name).toEqual('name')
  });

});
