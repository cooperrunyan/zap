// Native
import { join } from 'path';

// Packages
import { BrowserWindow, app } from 'electron';
import isDev from 'electron-is-dev';
import { terminal } from './terminal';
import { win as winOptions } from './win';

function createWindow() {
  const win = new BrowserWindow(winOptions);

  // and load the index.html of the app.
  if (isDev) win.loadURL(`http://localhost:${process.env.PORT || 3000}`);
  else win.loadFile(join(__dirname, '../src/out/index.html'));

  terminal(win);

  // Open the DevTools.
  if (isDev) win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
