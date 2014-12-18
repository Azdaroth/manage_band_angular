'use strict';

describe('Service: Task', function () {

  // load the service's module
  beforeEach(module('manageBandApp'));

  var band = {
    id: "1"
  };

  var taskList = {
    id: "2"
  };

  var task = {
    id: "3"
  };

  // instantiate service
  var Task, httpBackend;
  beforeEach(inject(function (_Task_, _$httpBackend_) {
    Task = _Task_;
    httpBackend = _$httpBackend_;
    httpBackend.when('POST', 'http://manage_band.dev/api/v1/bands/1/task_lists/2/tasks.json',
      { task: { name: "name" } }).respond("created");
    httpBackend.when('PATCH', 'http://manage_band.dev/api/v1/bands/1/task_lists/2/tasks/3.json',
      { task: { name: "name" } }).respond("updated");
    httpBackend.when('GET', 'http://manage_band.dev/api/v1/bands/1/task_lists/2/tasks/3.json')
      .respond({ tasks: task } );
    httpBackend.when('DELETE', 'http://manage_band.dev/api/v1/bands/1/task_lists/2/tasks/3.json')
      .respond("destroyed");
  }));

  describe("create", function() {
    it("makes call to api to create task in tasklist in band", function() {
      Task.create(band, taskList, { name: "name" }).then(function(response) {
        expect(response).toEqual("created");
      });
      httpBackend.flush();
    });
  });

  describe("update", function() {
    it("makes call to api to update task in tasklist in band", function() {
      Task.update(band, taskList, task, { name: "name" }).then(function(response) {
        expect(response).toEqual("updated");
      });
      httpBackend.flush();
    });
  });

  describe("find", function() {
    it("makes call to api to find task by id in tasklist in band", function() {
      Task.find(band, taskList, "3").then(function(response) {
        expect(response.id).toEqual(task.id);
      });
      httpBackend.flush();
    });
  });

  describe("destroy", function() {
    it("makes call to api to destroy task in tasklist in band", function() {
      Task.destroy(band, taskList, task).then(function(response) {
        expect(response).toEqual("destroyed");
      });
      httpBackend.flush();
    });
  });

});
