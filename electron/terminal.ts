import { BrowserWindow, ipcMain } from 'electron';
import { spawn } from 'node-pty';
import { SettingsManager } from './settings';

export function terminal(win: BrowserWindow) {
  const shell = new SettingsManager().getSettings().shell;

  const pty = spawn(shell.name, shell.shellArgs, {
    name: 'xterm-256color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: Object.fromEntries(Object.entries(process.env).filter((v) => !v[0]!.startsWith('npm'))) as any
  });

  ipcMain.on('x-term-resize', (_, cols, rows) => pty.resize(+cols, +rows));

  ipcMain.on('x-stdin', (_, stdin: string) => {
    pty.write(stdin.valueOf());
  });

  pty.onData((stdout) => {
    win.webContents.send('x-stdout', stdout);
  });
}
