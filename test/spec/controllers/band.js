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
      band,
      assetList,
      reloadedAssetList,
      assetLists,
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
    spyOn(AssetList, 'find').andCallFake(function() {
      var deferred = q.defer();
      deferred.resolve(reloadedAssetList);
      return deferred.promise;
    });
    Asset = _Asset_;
    scope = $rootScope.$new();
    BandCtrl = $controller('BandCtrl', {
      $scope: scope,
      $stateParams: stateParams,
      Band: Band,
      AssetList: AssetList,
      Asset: Asset
    });
    scope.$digest();
  }));

  it("assigns band and assetLists", function() {
    expect(scope.band).toEqual(band);
    expect(scope.assetLists).toEqual(assetLists);
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
    it('calls AssetList service to find assetlist by id', function() {
      rootScope.$broadcast('reload-asset-list', { id: "10" });
      expect(AssetList.find).toHaveBeenCalledWith(band, "10");
    });

    it('finds assetlist by id and substitus old one in list of all asset lists', function() {
      rootScope.$broadcast('reload-asset-list', { id: "10" });
      scope.$digest();
      expect(scope.assetLists[0].name).toEqual("name")
    });
  });

});
