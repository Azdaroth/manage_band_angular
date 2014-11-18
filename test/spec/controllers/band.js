'use strict';

describe('Controller: BandCtrl', function () {

  // load the controller's module
  beforeEach(module('manageBandApp'));

  var BandCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BandCtrl = $controller('BandCtrl', {
      $scope: scope
    });
  }));

});
