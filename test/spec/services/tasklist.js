'use strict';

describe('Service: TaskList', function () {

  // load the service's module
  beforeEach(module('manageBandApp'));

  // instantiate service
  var TaskList, httpBackend;
  beforeEach(inject(function (_TaskList_, _$httpBackend_) {
    TaskList = _TaskList_;
    httpBackend = _$httpBackend_;
    httpBackend.when('GET', 'http://manage_band.dev/api/v1/bands/1/task_lists.json')
      .respond( { task_lists: [ { id: "10" }, { id: "2" } ] } );
    httpBackend.when('POST', 'http://manage_band.dev/api/v1/bands/1/task_lists.json',
      { task_list: { name: "name" } }).respond("created");
    httpBackend.when('GET', 'http://manage_band.dev/api/v1/bands/1/task_lists/10.json')
      .respond( { task_lists: { id: "10" } } );
    httpBackend.when('PATCH', 'http://manage_band.dev/api/v1/bands/1/task_lists/10.json')
      .respond("updated");
    httpBackend.when('DELETE', 'http://manage_band.dev/api/v1/bands/1/task_lists/10.json')
      .respond("destroyed");
  }));

  var band = {
    id: "1"
  };

  var assetList = { id: "10" }

  describe("all", function() {
    it("makes call to api to get all assetlists for band", function() {
      TaskList.all(band).then(function(assetLists) {
        expect(assetLists.length).toEqual(2);
        expect(assetLists[0].id).toEqual("10")
        expect(assetLists[1].id).toEqual("2")
      });
      httpBackend.flush();
    });
  });

  describe("find", function() {
    it("makes call to api to get assetlist in band by id", function() {
      TaskList.find(band, "10").then(function(assetList) {
        expect(assetList.id).toEqual("10")
      });
      httpBackend.flush();
    });
  });

  describe("create", function() {
    it("makes call to api to create assetlist in band", function() {
      TaskList.create(band, { name: "name" }).then(function(response) {
        expect(response).toEqual("created");
      });
      httpBackend.flush();
    });
  });

  describe("update", function() {
    it("makes call to api to update assetlist in band with params", function() {
      TaskList.update(band, assetList, { name: "name" }).then(function(response) {
        expect(response).toEqual("updated");
      });
      httpBackend.flush();
    });
  });

  describe("destroy", function() {
    it("makes call to api to destroy assetlist in band", function() {
      TaskList.destroy(band, assetList).then(function(response) {
        expect(response).toEqual("destroyed");
      });
      httpBackend.flush();
    });
  });

});
