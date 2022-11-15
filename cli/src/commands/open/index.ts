import { cliffy } from '../../../deps.ts';
import { openApp } from '../../lib/openApp.ts';

export const open = new cliffy.Command();

open
  .name('open')
  .description('Open a specified directory with Zap')
  .arguments('[directory:string]')
  .action((_, dir) => openApp(dir ? ['--dir', dir] : []));
