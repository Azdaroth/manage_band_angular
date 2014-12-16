'use strict';

describe('Directive: taskList', function () {

  // load the directive's module
  beforeEach(module('manageBandApp'));

  var element,
      scope;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    element = angular.element('<task-list></task-list>');
    element = $compile(element)(scope);
  }));

  it('should make hidden element visible', function() {
    expect(element.text()).toBe('this is the taskLists directive');
  });
});
