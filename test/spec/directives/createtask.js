'use strict';

describe('Directive: createTask', function () {

  // load the directive's module
  beforeEach(module('manageBandApp'));

  var element,
      scope,
      rootScope,
      band,
      taskList,
      Task,
      newTask;


  band = {
    id: "1"
  };

  taskList = {
    id: "2",
    tasks: []
  };

  newTask = {
    name: 'name'
  };

  beforeEach(inject(function ($rootScope, $compile, _Task_, $q) {
    scope = $rootScope.$new();
    rootScope = $rootScope
    scope.band = band;
    scope.taskList = taskList;
    Task = _Task_;
    spyOn(Task, 'create').andCallFake(function() {
      var deferred = $q.defer();
      deferred.resolve({ task: newTask });
      return deferred.promise;
    });
    spyOn(rootScope, '$broadcast');
    element = angular.element('<create-task band="band" task-list="taskList"></create-task>');
    element = $compile(element)(scope);
    scope.$digest()
  }));

  it('calls Task service to create task list', function() {
    element.isolateScope().createTask();
    expect(Task.create).toHaveBeenCalledWith(band, taskList, {name: ''});
  });

  it('adds taskt to task list on success of adding calling Task service', function () {
    element.isolateScope().createTask();
    scope.$digest();
    expect(scope.taskList.tasks.length).toEqual(1);
    expect(scope.taskList.tasks[0].name).toEqual('name');
  });


  it('broadcasts reload-task-list event', function() {
    element.isolateScope().createTask();
    scope.$digest();
    expect(rootScope.$broadcast).toHaveBeenCalledWith('reload-task-list', scope.taskList);
  });

});
