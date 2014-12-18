'use strict';

describe('Controller: BandCtrl', function () {

  // load the controller's module
  beforeEach(module('manageBandApp'));

  var BandCtrl,
      scope,
      rootScope,
      stateParams,
      Band,
      Asset,
      AssetList,
      TaskList,
      band,
      assetList,
      reloadedAssetList,
      reloadedTaskList,
      assetLists,
      taskLists,
      q;

  stateParams = {
    id: "1"
  };

  band = {
    id: "2"
  };

  assetList = { id: "3" };
  reloadedAssetList = { id: "3", name: "name" };
  assetLists = [assetList];

  taskLists = [{ id: "3" }];
  reloadedTaskList = { id: "3", name: "name" };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q, _Asset_) {
    q = $q;
    rootScope = $rootScope;
    Band = {
      find: function(id) {
        var deferred = $q.defer();
        deferred.resolve(band);
        return deferred.promise;
      }
    };
    AssetList = {
      all: function(band) {
        var deferred = $q.defer();
        deferred.resolve(assetLists);
        return deferred.promise;
      },
      find: function() {

      }
    };
    TaskList = {
      all: function(band) {
        var deferred = $q.defer();
        deferred.resolve(taskLists);
        return deferred.promise;
      },
      find: function() {}
    };
    spyOn(AssetList, 'find').andCallFake(function() {
      var deferred = q.defer();
      deferred.resolve(reloadedAssetList);
      return deferred.promise;
    });
    spyOn(TaskList, 'find').andCallFake(function() {
      var deferred = q.defer();
      deferred.resolve(reloadedTaskList);
      return deferred.promise;
    });
    Asset = _Asset_;
    scope = $rootScope.$new();
    BandCtrl = $controller('BandCtrl', {
      $scope: scope,
      $stateParams: stateParams,
      Band: Band,
      AssetList: AssetList,
      Asset: Asset,
      TaskList: TaskList
    });
    scope.$digest();
  }));

  it("assigns band, asset lists and task lists", function() {
    expect(scope.band).toEqual(band);
    expect(scope.assetLists).toEqual(assetLists);
    expect(scope.taskLists).toEqual(taskLists);
  });

  describe("assetChanged", function() {
    it("calls Asset service to link assets from tree structure", function() {
      spyOn(Asset, 'link');
      var assetsTree = { item: { id: "10" }, children: [] };
      scope.assetChanged(assetList, assetsTree);
      expect(Asset.link).toHaveBeenCalledWith(band, assetList, assetsTree)
    });
  });

  describe('reload-asset-list event being broadcasted', function() {
    it('calls AssetList service to find assetl ist by id', function() {
      rootScope.$broadcast('reload-asset-list', { id: "10" });
      expect(AssetList.find).toHaveBeenCalledWith(band, "10");
    });

    it('finds asset lisr by id and substitutes old one in list of all asset lists', function() {
      rootScope.$broadcast('reload-asset-list', { id: "10" });
      scope.$digest();
      expect(scope.assetLists[0].name).toEqual("name")
    });
  });

  describe('reload-task-list event being broadcasted', function() {
    it('calls TaskList service to find task list by id', function() {
      rootScope.$broadcast('reload-task-list', { id: "10" });
      expect(TaskList.find).toHaveBeenCalledWith(band, "10");
    });

    it('finds task list by id and substitutes old one in list of all task lists', function() {
      rootScope.$broadcast('reload-task-list', { id: "3" });
      scope.$digest();
      expect(scope.taskLists[0].name).toEqual("name")
    });
  });

});
