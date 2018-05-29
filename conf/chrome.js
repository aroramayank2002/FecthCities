// var env = require("./tests");
//env.push('./test/common/**');
exports.config = {
      specs: './test/FetchCities.js',
      capabilities: [{
      'browserName': 'chrome',
      'deviceName': 'Desktop',
      chromeOptions: {

        // args: ['disable-infobars','use-mobile-user-agent', 'user-agent=Mozilla/5.0 (Linux; Android 5.0; en-us; Nexus 5 Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Mobile Safari/537.36'],
        // 'window-size='+confHelper.getDeviceDimension("dimension")
        args: ['disable-infobars',
               'window-size=1400,800',
               'use-mobile-user-agent',
               'user-agent=Mozilla/5.0 (Linux; Android 5.0; en-us; Nexus 5 Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Mobile Safari/537.36'
              ]

      }
  }],
  //testArgv: [{'user':'Mobile12'}],
  port: '9515',
  path: '/',
  services: ['chromedriver'],
  maxInstances: 1,
  logLevel: 'silent',
  coloredLogs: true,
  screenshotPath: './screenShots/',
  baseUrl: 'http://localhost',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['dot','allure'],
    mochaOpts: {
        ui: 'bdd'
    },
    before: function() {
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');

    chai.use(chaiAsPromised);
    expect = chai.expect;
    chai.should();
    },
}
