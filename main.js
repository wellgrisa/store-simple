'use strict';
const electron = require('electron');
const ipc = require('ipc');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;
const dialog = electron.dialog;
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
});

ipc.on('toggle-insert-view', function() {
  savePDF();
    // if(!printWindow) {
    //     createPrintWindow();
    // }
    // return (!printWindow.isClosed() && printWindow.isVisible()) ? printWindow.hide() : printWindow.show();
});

function createPrintWindow(){
  printWindow = new BrowserWindow({'auto-hide-menu-bar':true});
  printWindow.loadUrl('file://' + __dirname + '/print.html');
  printWindow.on('closed',function() {
      printWindow = null;
  });
}

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
