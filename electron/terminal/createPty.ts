import { spawn } from 'node-pty';
import { initialSettings } from '../settings/SettingsManager';

export function createPty(dir?: string) {
  const shell = initialSettings.shell;
  const env = Object.fromEntries(Object.entries(process.env).filter((v) => !v[0]!.startsWith('npm'))) as any;

  const pty = spawn(shell.name, shell.shellArgs, {
    name: 'xterm-256color',
    cols: 80,
    rows: 30,
    cwd: dir || process.env.HOME,
    env
  });

  return pty;
}
