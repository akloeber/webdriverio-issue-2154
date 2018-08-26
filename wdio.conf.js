exports.config = {
  services: ['selenium-standalone'],
  seleniumLogs: './logs',
  specs: [
    'test/*.spec.js',
  ],
  framework: 'jasmine',
  capabilities: [{
    browserName: 'chrome',
  }],
};
