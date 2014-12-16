'use strict';

describe('Controller: AssetCtrl', function () {

  // load the controller's module
  beforeEach(module('manageBandApp'));

  var AssetCtrl,
      scope,
      stateParams,
      band,
      Band,
      band,
      asset,
      Asset,
      assetList,
      AssetList;

  stateParams = {
    bandId: 1,
    assetListId: 2,
    asset: 3
  }

  band = {
    id: 1
  };

  assetList = {
    id: 2
  };

  asset = {
    id: 3
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    Band = {
      find: function(id) {
        var deferred = $q.defer();
        deferred.resolve(band);
        return deferred.promise;
      }
    };

    AssetList = {
      find: function(band, id) {
        var deferred = $q.defer();
        deferred.resolve(assetList);
        return deferred.promise;
      }
    };

    Asset = {
      find: function(band, assetList, id) {
        var deferred = $q.defer();
        deferred.resolve(asset);
        return deferred.promise;
      }
    };
    scope = $rootScope.$new();
    AssetCtrl = $controller('AssetCtrl', {
      $scope: scope,
      $stateParams: stateParams,
      Band: Band,
      AssetList: AssetList,
      Asset: Asset
    });
    scope.$digest();
  }));

  it('assigns band, assetList and asset', function () {
    expect(scope.band).toEqual(band);
    expect(scope.assetList).toEqual(assetList);
    expect(scope.asset).toEqual(asset);
  });
});
