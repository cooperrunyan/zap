// Native
import { join } from 'path';

// Packages
import { app, BrowserWindow, globalShortcut, Menu } from 'electron';
import { terminal } from './terminal';
import { win as winOptions } from './win';

app.commandLine.appendSwitch('ignore-gpu-blacklist');

async function createWindow() {
  const win = new BrowserWindow(winOptions);
  win.once('ready-to-show', () => win.show());

  // and load the index.html of the app.
  load(win);

  const teardown = terminal(win);

  // Open the DevTools.
  if (process.env.NODE_ENV === 'development') win.webContents.openDevTools();

  globalShortcut.register('Command+Control+Z', () => {
    app.show();
    win.show();
  });

  win.on('close', teardown);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  await createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  app.dock?.setMenu(Menu.buildFromTemplate([{ label: 'New Window', click: createWindow }]));
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

const load = (win: BrowserWindow) => {
  if (process.env.NODE_ENV === 'development') win.loadURL(`http://localhost:${process.env.PORT || 3000}?id=${win.id}`);
  else
    win.loadFile(join(__dirname, `../client/index.html`), {
      query: { id: String(win.id) }
    });
};
