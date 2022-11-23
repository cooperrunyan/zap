
import { app, BrowserWindow, } from 'electron';
import { terminal } from '../terminal';
import { windowOptions } from './windowOptions';

import { loadFile } from './loadFile'

import yargs from 'yargs';

import windowStateKeeper from 'electron-window-state';

export async function createWindow() {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1550,
    defaultHeight: 850
  });

  const win = new BrowserWindow({
    ...windowOptions,
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height
  });

  mainWindowState.manage(win);

  win.once('ready-to-show', () => win.show());

  const { dir } = await yargs.option('dir', { type: 'string' }).argv;

  loadFile(win);

  const teardown = terminal(win, dir);

  if (process.env.NODE_ENV === 'development') win.webContents.openDevTools();

  win.on('close', teardown);
}

