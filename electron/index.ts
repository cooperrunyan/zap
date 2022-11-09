// Native
import { join } from 'path';

// Packages
import { app, BrowserWindow, Menu } from 'electron';
import isDev from 'electron-is-dev';
import yargs from 'yargs';
import { checkCLI } from './checkCLI';
import { terminal } from './terminal';
import { win as winOptions } from './win';

async function createWindow() {
  const cliCommand = await checkCLI();

  const win = new BrowserWindow(winOptions);

  const { dir, settings: openSettings } = await yargs
    .option('dir', { type: 'string' })
    .option('settings', { type: 'boolean' }).argv;

  // and load the index.html of the app.
  load(win, !!openSettings);

  const teardown = terminal(win, dir || null, cliCommand);

  // Open the DevTools.
  if (isDev) win.webContents.openDevTools();

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

const load = (win: BrowserWindow, openSettings: boolean) => {
  if (isDev)
    win.loadURL(`http://localhost:${process.env.PORT || 3000}?id=${win.id}&settings=${String(!!openSettings)}`);
  else
    win.loadFile(join(__dirname, `../src/out/index.html`), {
      query: {
        id: String(win.id),
        settings: String(!!openSettings)
      }
    });
};
