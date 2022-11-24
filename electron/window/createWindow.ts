import { BrowserWindow, ipcMain } from 'electron';
import { windowOptions } from './windowOptions';

import { getWindowFromId } from './getWindowFromId'

import { loadFile } from './loadFile';

import type { getArgs } from '../args';

import windowStateKeeper from 'electron-window-state';
import { createTerminal } from '../terminal/createTerminal';

export async function createWindow(args: Awaited<ReturnType<typeof getArgs>>) {
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

  ipcMain.handle(`x-request-terminal-win${win.id}`, (_, windowId: string, dir?: string) => {
    const win = getWindowFromId(windowId);

    const terminal = createTerminal(win, dir);

    win.on('close', () => terminal.teardown());

    return terminal.id;
  })


  loadFile(win, args.dir);

  if (process.env.NODE_ENV === 'development') win.webContents.openDevTools();
}
