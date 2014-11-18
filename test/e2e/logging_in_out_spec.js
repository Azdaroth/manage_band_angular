var HttpBackendMocks = require('./http_backend_mocks');
var LoginPage = require('./login_page');


describe('Logging in / out', function() {

  var ptor;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.addMockModule('httpBackEndMock', HttpBackendMocks.build(function ($httpBackend) {
        $httpBackend.whenPOST(/.*auth\/sign_in/).respond(function() {
          return [200, { data: { email: "email@example.com", id: "1" } } ];
        });
        $httpBackend.whenGET(/.*/).passThrough();
      })
    );
    ptor.get('http://127.0.0.1:9000/');
    LoginPage.logIn();
  });

  it('user can log in and is redirected to main page and sees flash message about successful login', function() {
    expect(ptor.getCurrentUrl()).toEqual('http://127.0.0.1:9000/#/');
    // proned to random failures, why?
    expect(element(by.css('.alert')).getText()).toEqual('You have been logged in.');
  });

  it('registration and signing in links are not available after logging in', function() {
    expect(element(by.css('.register-btn')).isDisplayed()).toBe(false);
    expect(element(by.css('.sign-in-btn')).isDisplayed()).toBe(false);
  });

  it('user can sign out and register or log in again', function() {
    LoginPage.logOut();
    // proned to random failures, why?
    expect(element(by.css('.alert')).getText()).toEqual('You have been logged out.');
  });

});