'use strict';

describe('Controller: SessionsCtrl', function () {

  // load the controller's module
  beforeEach(module('manageBandApp'));

  var fakeAuth = {
    submitLogin: function(form) {}
  };

  var fakeState = {
    go: function(state) {}
  };

  var flash = {};

  var SessionsCtrl, rootScope, scope, q;

  // needed to stub it out, $auth alone caused some errors
  angular.module('ng-token-auth', []).provider('$auth', function() {
    return {
      configure: function() {},
      $get: [],
    };
  })

  beforeEach(module('manageBandApp', 'ng-token-auth'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    SessionsCtrl = $controller('SessionsCtrl', {
      $scope: scope,
      $auth: fakeAuth,
      $state: fakeState,
      flash: flash
    });
    q = $q;
  }));


  describe('logIn', function() {

    it('sets error message if error happend', function() {
      fakeAuth.submitLogin = function(form) {
        var deferred = q.defer();
        deferred.reject({ errors: ["Invalid credentials"] });
        return deferred.promise;
      };

      scope.logIn();
      scope.$digest();
      expect(scope.error).toEqual('Error: Invalid credentials');
    });

  });

  describe('auth:login-error', function() {
    it('sets errors message', function() {
      rootScope.$broadcast('auth:login-error', { errors: ["Invalid credentials"] });
      expect(scope.error).toEqual('Error: Invalid credentials');
    });
  });

  describe('auth:login-success', function() {

    beforeEach(function() {
      spyOn(fakeState, 'go');
      rootScope.$broadcast('auth:login-success', {});
    })

    it('sets flash message', function() {
      expect(flash.success).toEqual('You have been logged in.')
    });

    it('redirects to main page', function() {
      expect(fakeState.go).toHaveBeenCalledWith('main');
    });
  });

});
