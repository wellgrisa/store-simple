import { shell } from 'electron'; // eslint-disable-line import/no-unresolved


export function buildTemplate(app, appConfig) {
  return [
    {
      label: 'File',
      submenu: [
        {
          label: 'Quit',
          accelerator: 'Alt+F4',
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'Ctrl+Z',
          selector: 'undo:',
        },
        {
          label: 'Redo',
          accelerator: 'Shift+Ctrl+Z',
          selector: 'redo:',
        },
        {
          type: 'separator',
        },
        {
          label: 'Cut',
          accelerator: 'Ctrl+X',
          selector: 'cut:',
        },
        {
          label: 'Copy',
          accelerator: 'Ctrl+C',
          selector: 'copy:',
        },
        {
          label: 'Paste',
          accelerator: 'Ctrl+V',
          selector: 'paste:',
        },
        {
          label: 'Select All',
          accelerator: 'Ctrl+A',
          selector: 'selectAll:',
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Ctrl+R',
        },
        {
          label: 'Toggle DevTools',
          accelerator: 'Alt+Ctrl+I',
        },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Report Issue'          
        },
        {
          label: `About ${appConfig.name}`
        },
      ],
    },
  ];
}