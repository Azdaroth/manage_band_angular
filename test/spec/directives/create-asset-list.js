'use strict';

describe('Directive: createAssetList', function () {

  // load the directive's module
  beforeEach(module('manageBandApp'));

  var element,
      scope,
      newAssetList,
      assetLists;

  newAssetList = {
    name: '',
    assets: []
  };

  assetLists = [];

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<create-asset-list asset-lists="assetLists"></create-asset-list>');
    element = $compile(element)(scope);
    scope.assetLists = assetLists;
    scope.newAssetList = newAssetList;
    scope.$digest();
    element.isolateScope().createAssetList();
    expect(assetLists.length).toEqual(1);
  }));
});
