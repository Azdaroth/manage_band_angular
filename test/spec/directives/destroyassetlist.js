'use strict';

describe('Directive: destroyAssetList', function () {

  // load the directive's module
  beforeEach(module('manageBandApp'));

  var element,
      scope,
      band,
      assetList,
      assetLists,
      AssetList;

  band = {
    id: "1"
  };

  assetList = {
    id: "2"
  };

  assetLists = [assetList];

  beforeEach(inject(function ($rootScope, $compile, _AssetList_, $q) {
    scope = $rootScope.$new();
    scope.band = band;
    scope.assetList = assetList;
    scope.assetLists = assetLists;
    AssetList = _AssetList_;
    spyOn(AssetList, 'destroy').andCallFake(function() {
      var deferred = $q.defer();
      deferred.resolve(true);
      return deferred.promise;
    });
    element = angular.element('<destroy-asset-list band="band" asset-list="assetList" asset-lists="assetLists"></destroy-asset-list>');
    element = $compile(element)(scope);
    scope.$digest();
  }));

  it('calls AssetList service to destroy assetList', function () {
    element.isolateScope().destroyAssetList();
    expect(AssetList.destroy).toHaveBeenCalledWith(band, assetList);
  });

  it('removes assetList from scope after calling AssetList service', function () {
    element.isolateScope().destroyAssetList();
    scope.$digest();
    expect(scope.assetLists.length).toEqual(0);
  });
});
