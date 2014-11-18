LoginPage = function() {

  return {
    logIn: function() {
      element(by.css('.sign-in-btn')).click();
      element(by.model('logInForm.email')).sendKeys('email@example.com');
      element(by.model('logInForm.password')).sendKeys('foobar123');
      element(by.css('.submit-login-btn')).click();
    },

    logOut: function() {
      element(by.css('.sign-out-btn')).click();
    }
  };

}();

module.exports = LoginPage;