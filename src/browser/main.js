'use strict';

if(require('electron-squirrel-startup')) return;

import { app, dialog } from 'electron'; // eslint-disable-line import/no-unresolved
import { buildNewWindow } from './window';

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => buildNewWindow(app));

process.on('uncaughtException', error => {
  if (error.stack) {
    console.error('Sqlectron error:', error.stack);
  }
  return dialog.showErrorBox('An error occurred', error.name + ': ' + error.message);
});