exports.config = {
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  specs: ['e2e/*_spec.js'],
  baseUrl: 'http://localhost:9001' //default test port with Yeoman
}