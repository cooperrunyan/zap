import {app, BrowserWindow, globalShortcut, Menu } from  'electron'
import { getArgs } from './args';

import { createWindow } from './window/createWindow'

getArgs().then(args => { 
  app.whenReady().then(async () => {
    await createWindow(args);

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow(args);
    });

    globalShortcut.register('Command+Control+Z', () => {
      app.show();
      for (const win of BrowserWindow.getAllWindows()) win.show();
    });

    app.dock?.setMenu(Menu.buildFromTemplate([{ label: 'New Window', click: () => createWindow(args) }]));
  });
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
})

