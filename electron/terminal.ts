import { BrowserWindow, ipcMain } from 'electron';
import { spawn } from 'node-pty';
import { SettingsManager } from './settings';

export function terminal(win: BrowserWindow, dir: string | null) {
  const shell = new SettingsManager().getSettings().shell;

  const pty = spawn(shell.name, shell.shellArgs, {
    name: 'xterm-256color',
    cols: 80,
    rows: 30,
    cwd: dir || process.env.HOME,
    env: Object.fromEntries(Object.entries(process.env).filter((v) => !v[0]!.startsWith('npm'))) as any
  });

  ipcMain.on(`x-term-resize-${win.id}`, (_, cols, rows) => pty.resize(+cols, +rows));

  ipcMain.on(`x-stdin-${win.id}`, (_, stdin: string) => {
    pty.write(stdin.valueOf());
  });

  pty.onData((stdout) => {
    win.webContents.send(`x-stdout-${win.id}`, stdout);
  });

  return () => {
    pty.kill();
    ipcMain.removeAllListeners(`x-term-resize-${win.id}`);
    ipcMain.removeAllListeners(`x-stdin-${win.id}`);
  };
}
