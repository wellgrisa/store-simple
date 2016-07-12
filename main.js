'use strict';
if(require('electron-squirrel-startup')) return;
const electron = require('electron');
const ipc = require('ipc');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;
const dialog = electron.dialog;
const { ipcMain } = require('electron');
var fs = require('fs');

var mainWindow = null;
var printWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    darkTheme: true
  });  

  mainWindow.maximize();
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  const autoUpdater = require('auto-updater');
  const appVersion = require('./package.json').version;
  const os = require('os').platform();
  //https://update-me-plz.herokuapp.com/update/win32/0.0.9
  autoUpdater.setFeedURL('https://update-me-plz.herokuapp.com/update/win32/0.9.0');

  autoUpdater
    .on('error', function(){
      console.log(arguments);
      dialog.showMessageBox({ message: arguments, buttons: ["OK"] });
    })
    .on('checking-for-update', function() {
      console.log('Checking for update');
      dialog.showMessageBox({ message: "checking-for-update! :-)", buttons: ["OK"] });
    })
    .on('update-available', function() {
      console.log('Update available');
      dialog.showMessageBox({ message: 'update-available', buttons: ["OK"] });
    })
    .on('update-not-available', function() {
      console.log('Update not available');
      dialog.showMessageBox({ message: 'Update not available', buttons: ["OK"] });
    })
    .on('update-downloaded', function() {
      notifyUserAboutUpdate();
      autoUpdater.quitAndInstall();
    });  

    mainWindow.webContents.on("did-frame-finish-load", (event) => {
      autoUpdater.checkForUpdates()
    })
});

function notifyUserAboutUpdate() {
  const buttons = ['Sure, get me a new version!', 'Nah, I\'m good, I can wait.'];
  const options = {
    type: 'question',
    message: 'Hey, new version of app is downloaded! Do you want to restart it now and get the newest version?',
    cancelId: -1,
    buttons,
  };

  // dialog.showMessageBox(window, options, function(response) {
  //   if (response == 0) {
  //     autoUpdater.quitAndInstall();
  //   }
  // });

  dialog.showMessageBox({ message: "The file has been saved! :-)", buttons: ["OK"] });
}

ipcMain.on('toggle-insert-view', (event, arg) => {
  if(!printWindow) {
      createPrintWindow(arg);
  }

  printWindow.show();
});

function createPrintWindow(args){
  printWindow = new BrowserWindow({'auto-hide-menu-bar':true});
  //printWindow.loadUrl('file://' + __dirname + '/print.html');
  printWindow.loadURL('file://' + __dirname + '/index.html');
  printWindow.webContents.on('did-finish-load', () => {
    printWindow.webContents.send('ping', args);
  });
  printWindow.on('closed',function() {
      printWindow = null;
  });
}

ipcMain.on('print-view', (event, arg) => {
  savePDF();
});

function savePDF() {
  if (!mainWindow) {
    dialog.showErrorBox('Error', "The printing window isn't created");
    return;
  }
  dialog.showSaveDialog(mainWindow, {}, function(file_path) {
    if (file_path) {
      mainWindow.printToPDF(getPDFPrintSettings(), function(err, data) {
        if (err) {
          dialog.showErrorBox('Error', err);
          return;
        }
        fs.writeFile(file_path, data, function(err) {
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
    pageSize: 'A4',
  };
}
