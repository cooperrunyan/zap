import { cliffy } from '../../../deps.ts';
import { openApp } from '../../lib/openApp.ts';

export const open = new cliffy.Command();

open
  .name('open')
  .description('Open a specified directory with Zap')
  .arguments('[directory:string]')
  .action((_, directory) => openDirectory(directory));

export async function openDirectory(dir: string | undefined) {
  await openApp(dir ? ['--dir', dir] : []);
}
