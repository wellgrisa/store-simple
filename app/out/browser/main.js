'use strict';
if (require('electron-squirrel-startup')) return;
var electron = require('electron');
var ipc = require('ipc');
var app = electron.app; // Module to control application life.
var BrowserWindow = electron.BrowserWindow;
var dialog = electron.dialog;

var _require = require('electron');

var ipcMain = _require.ipcMain;

var fs = require('fs');
var path = require('path');
var mainWindow = null;
var printWindow = null;

var devMode = (process.argv || []).indexOf('--dev') !== -1;

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    darkTheme: true
  });

  mainWindow.maximize();

  var entryBasePath = devMode ? 'http://localhost:8080' : 'file://' + path.resolve(__dirname, '..');
  mainWindow.loadURL(entryBasePath + '/static/index.html');
  //mainWindow.loadURL('file://' + path.join(__dirname, '../Renderer/', 'index.html?devMode=' + devMode));
  //mainWindow.loadURL('file://' + __dirname + '/index.html');
  if (process.env.NODE_ENV !== 'production') {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  var autoUpdater = require('auto-updater');
  //const appVersion = require('./package.json').version;
  var os = require('os').platform();
  //https://update-me-plz.herokuapp.com/update/win32/0.0.9
  autoUpdater.setFeedURL('https://update-me-plz.herokuapp.com/update/win32/0.9.0');

  autoUpdater.on('error', function () {
    console.log(arguments);
  }).on('checking-for-update', function () {
    console.log('Checking for update');
    dialog.showMessageBox({ message: "checking-for-update! :-)", buttons: ["OK"] });
  }).on('update-available', function () {
    console.log('Update available');
    dialog.showMessageBox({ message: 'update-available', buttons: ["OK"] });
  }).on('update-not-available', function () {
    console.log('Update not available');
    dialog.showMessageBox({ message: 'Update not available', buttons: ["OK"] });
  }).on('update-downloaded', function () {
    notifyUserAboutUpdate();
    autoUpdater.quitAndInstall();
  });

  mainWindow.webContents.on("did-frame-finish-load", function (event) {
    autoUpdater.checkForUpdates();
  });
});

function notifyUserAboutUpdate() {
  var buttons = ['Sure, get me a new version!', 'Nah, I\'m good, I can wait.'];
  var options = {
    type: 'question',
    message: 'Hey, new version of app is downloaded! Do you want to restart it now and get the newest version?',
    cancelId: -1,
    buttons: buttons
  };

  dialog.showMessageBox({ message: "The file has been saved! :-)", buttons: ["OK"] });
}

ipcMain.on('toggle-insert-view', function (event, arg) {
  if (!printWindow) {
    createPrintWindow(arg);
  }

  printWindow.show();
});

function createPrintWindow(args) {
  printWindow = new BrowserWindow({ 'auto-hide-menu-bar': true });
  //printWindow.loadUrl('file://' + __dirname + '/print.html');
  printWindow.loadURL('file://' + __dirname + '/index.html');
  printWindow.webContents.on('did-finish-load', function () {
    printWindow.webContents.send('ping', args);
  });
  printWindow.on('closed', function () {
    printWindow = null;
  });
}

ipcMain.on('print-view', function (event, arg) {
  savePDF();
});

function savePDF() {
  if (!mainWindow) {
    dialog.showErrorBox('Error', "The printing window isn't created");
    return;
  }
  dialog.showSaveDialog(mainWindow, {}, function (file_path) {
    if (file_path) {
      mainWindow.printToPDF(getPDFPrintSettings(), function (err, data) {
        if (err) {
          dialog.showErrorBox('Error', err);
          return;
        }
        fs.writeFile(file_path, data, function (err) {
          if (err) {
            dialog.showErrorBox('Error', err);
            return;
          }
          console.log("<p> Write PDF file: " + file_path + " successfully!</p>");
        });
      });
    }
  });
}

function getPDFPrintSettings() {
  return {
    landscape: false,
    marginsType: 0,
    printBackground: false,
    printSelectionOnly: false,
    pageSize: 'A4'
  };
}