import { randomUUID } from 'crypto';
import { BrowserWindow, ipcMain } from 'electron';
import { createPty } from './createPty';

export function createTerminal(win: BrowserWindow, dir?: string) {
  const id = randomUUID();
  const pty = createPty(dir);

  ipcMain.on(`x-term-resize-${id}`, (_, cols, rows) => pty.resize(+cols, +rows));
  ipcMain.on(`x-stdin-${id}`, (_, stdin: string) => pty.write(stdin.valueOf()));

  pty.onData((stdout) => win.webContents.send(`x-stdout-${id}`, stdout));

  const close = () => {
    if (!win?.isDestroyed()) {
      ipcMain?.removeAllListeners(`x-term-resize-${id}`);
      ipcMain?.removeAllListeners(`x-stdin-${id}`);
    }
  };

  pty.onExit(close);

  return {
    id,
    teardown: () => {
      close();
      pty.kill();
    }
  };
}
