import { app, BrowserWindow, ipcMain } from 'electron';
import { spawn } from 'node-pty';
import path from 'path';
import { initialSettings } from './settings';

export function terminal(win: BrowserWindow, dir?: string) {
  const shell = initialSettings.shell;
  const env = Object.fromEntries(Object.entries(process.env).filter((v) => !v[0]!.startsWith('npm'))) as any;

  const cliPath = path.resolve(__dirname, '../../../', 'compiled', 'cli');

  env.PATH += `:${cliPath}`;
  env.ZAP_APP_PATH =
    process.env.NODE_ENV === 'development'
      ? path.resolve('dist/mac-arm64/Zap.app/Contents/MacOS/Zap')
      : app.getPath('exe');
  env.ZAP_RUNNER_PATH =
    process.env.NODE_ENV === 'development' ? path.resolve('compiled/cli/zap-runner') : path.join(cliPath, 'zap-runner');

  if (process.env.NODE_ENV === 'development') env.PATH += `:${path.resolve(__dirname, '../', 'cli')}`;

  const pty = spawn(shell.name, shell.shellArgs, {
    name: 'xterm-256color',
    cols: 80,
    rows: 30,
    cwd: dir || process.env.HOME,
    env
  });

  ipcMain.on(`x-term-resize-${win.id}`, (_, cols, rows) => pty.resize(+cols, +rows));

  ipcMain.on(`x-stdin-${win.id}`, (_, stdin: string) => {
    pty.write(stdin.valueOf());
  });

  pty.onData((stdout) => {
    win.webContents.send(`x-stdout-${win.id}`, stdout);
  });

  const close = () => {
    if (!win?.isDestroyed()) {
      ipcMain?.removeAllListeners(`x-term-resize-${win.id}`);
      ipcMain?.removeAllListeners(`x-stdin-${win.id}`);

      win?.destroy();
    }
  };

  pty.onExit(close);

  return () => {
    close();
    pty.kill();
  };
}
