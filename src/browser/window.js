import { resolve } from 'path';
import { ipcMain, BrowserWindow, dialog } from 'electron';
import { attachMenuToWindow } from './menu';
import { get as getConfig } from './config';
import fs from 'fs';
import autoUpdater from 'auto-updater';

const devMode = (process.argv || []).indexOf('--dev') !== -1;

const WINDOWS = {};

let mainWindow = null;

let windowsNumber = 0;

export function buildNewWindow(app) {
  const appConfig = getConfig();

  windowsNumber += 1;

  mainWindow = new BrowserWindow({
    title: appConfig.name,
    icon: resolve(__dirname, '..', '..', 'build', 'icon.ico'),
    darkTheme: true,
  });

  mainWindow.maximize();

  //attachMenuToWindow(app, appConfig);

  const entryBasePath = devMode ? 'http://localhost:8080' : ('file://' + resolve(__dirname, '..'));

  mainWindow.loadURL(entryBasePath + '/static/index.html');

  mainWindow.on('closed', () => delete WINDOWS[windowsNumber]);

  if (devMode) {    
    mainWindow.openDevTools();
  } else{
    mainWindow.webContents.on("did-frame-finish-load", () => {    
      checkUpdate();
    })    
  }
}

const checkUpdate = () => {
  autoUpdater.setFeedURL(`https://update-me-plz.herokuapp.com/update/win32/${getConfig().version}`);

  autoUpdater.checkForUpdates();

  autoUpdater
    .on('error', function(){
      mainWindow.webContents.send('update:hotMessage', 'Deu problema :()');
    })
    .on('checking-for-update', function() {
      mainWindow.webContents.send('update:hotMessage', 'Buscando atualizações');
    })
    .on('update-available', function() {
      mainWindow.webContents.send('update:hotMessage', 'Atualização disponível, em breve você terá novas funcionalidades :)');
    })
    .on('update-not-available', function() {
      mainWindow.webContents.send('update:hotMessage', 'Nenhuma atualização disponível');
    })
    .on('update-downloaded', function() {
      mainWindow.webContents.send('update:hotMessage', 'Atualização baixada com sucesso ;)');
      autoUpdater.quitAndInstall();
    });  
}

ipcMain.on('print-view', (event, arg) => {
  savePDF();
});

const savePDF = () => {
  if (!mainWindow) {
    dialog.showErrorBox('Error', "The printing window isn't created");
    return;
  }
  dialog.showSaveDialog(mainWindow, {}, function(file_path) {
    if (file_path) {
      mainWindow.printToPDF(pdfDefaultSettings, function(err, data) {
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

const pdfDefaultSettings = {
  landscape: false,
  marginsType: 1,
  printBackground: false,
  printSelectionOnly: false,
  pageSize: 'A4',
}
