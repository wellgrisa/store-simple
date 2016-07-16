'use strict';

var _electron = require('electron');

// eslint-disable-line import/no-unresolved

var _window = require('./window');

if (require('electron-squirrel-startup')) return;

_electron.app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    _electron.app.quit();
  }
});

_electron.app.on('ready', function () {
  return _window.buildNewWindow(_electron.app);
});

process.on('uncaughtException', function (error) {
  if (error.stack) {
    console.error('Sqlectron error:', error.stack);
  }
  return _electron.dialog.showErrorBox('An error occurred', error.name + ': ' + error.message);
});