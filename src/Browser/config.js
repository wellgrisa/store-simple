var fs = require('fs');
var path = require('path');

var appConfig;

exports.get = function getConfiguration() {
  var basePath = path.resolve(__dirname, '..', '..');

  if (appConfig) {
    return appConfig;
  }

  appConfig = readJSON(path.resolve(basePath, 'package.json'));

  if (appConfig.version) {
    return appConfig;
  }

  appConfig = readJSON(path.resolve(basePath, 'app', 'package.json'));

  return appConfig;
};

function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}
