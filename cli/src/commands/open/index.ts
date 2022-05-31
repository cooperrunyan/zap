import { cliffy } from '../../../deps.ts';
import { getAppPath } from '../../lib/getAppPath.ts';

export const open = new cliffy.Command();

open
  .name('open')
  .description('Open a specified directory with Zap')
  .arguments('[directory:string]')
  .default('.')
  .action((_, directory = '.') => openDirectory(directory));

export async function openDirectory(dir: string) {
  const zapPath = await getAppPath();
  console.log(zapPath);
}
