'use strict';

describe('Controller: BandCtrl', function () {

  // load the controller's module
  beforeEach(module('manageBandApp'));

  var BandCtrl,
      scope,
      stateParams,
      Band,
      Asset,
      AssetList,
      band,
      assetList,
      assetLists;

  stateParams = {
    id: "1"
  };

  band = {
    id: "2"
  };

  assetList = { id: "3" };

  assetLists = [assetList];

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q, _Asset_) {
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
      }
    };
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

});
