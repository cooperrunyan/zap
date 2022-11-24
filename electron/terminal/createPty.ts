import { app } from 'electron';
import { spawn } from 'node-pty';
import path from 'path';
import { initialSettings } from '../settings/SettingsManager';

export function createPty(dir?: string) {
  const shell = initialSettings.shell;
  const env = Object.fromEntries(Object.entries(process.env).filter((v) => !v[0]!.startsWith('npm'))) as any;

  const cliPath = path.resolve(__dirname, '../../../../', 'compiled', 'cli');

  env.PATH += `:${cliPath}`;
  env.ZAP_APP_PATH =
    process.env.NODE_ENV === 'development'
      ? path.resolve('dist/mac-arm64/Zap.app/Contents/MacOS/Zap')
      : app.getPath('exe');

  env.ZAP_RUNNER_PATH =
    process.env.NODE_ENV === 'development' ? path.resolve('compiled/cli/zap-runner') : path.join(cliPath, 'zap-runner');

  if (process.env.NODE_ENV === 'development') env.PATH += `:${path.resolve(__dirname, '../../', 'cli')}`;

  const pty = spawn(shell.name, shell.shellArgs, {
    name: 'xterm-256color',
    cols: 80,
    rows: 30,
    cwd: dir || process.env.HOME,
    env
  });

  return pty;
}
