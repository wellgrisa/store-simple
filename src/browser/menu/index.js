import { Menu } from 'electron';
import * as win32 from './win32';

const menus = {  
  win32,
};

export function attachMenuToWindow(app, appConfig) {
  const template = menus[process.platform].buildTemplate(app, appConfig);
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
