import { cliffy } from '../../../deps.ts';

export const open = new cliffy.Command();

open
  .name('open')
  .description('Open a specified directory with Zap')
  .arguments('[directory:string]')
  .default('.')
  .action((options, directory = '.') => openDirectory(directory));

export function openDirectory(dir: string) {
  console.log(dir);
}
