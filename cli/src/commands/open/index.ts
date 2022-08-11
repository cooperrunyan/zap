import { chalk, cliffy } from '../../../deps.ts';
import { getAppPath } from '../../lib/getAppPath.ts';

export const open = new cliffy.Command();

open
  .name('open')
  .description('Open a specified directory with Zap')
  .arguments('[directory:string]')
  .action((_, directory) => openDirectory(directory));

export async function openDirectory(dir: string | undefined) {
  const zapPath = await getAppPath();

  if (!zapPath) {
    console.log(
      `\n  ${chalk.bold.red('Error:')}\n\n    There was a problem locating the path to Zap. Zap may be corrupt.\n`
    );
    Deno.exit(1);
  }

  Deno.run({
    cmd: [zapPath, ...[dir ? ['--dir', dir] : []]].flat()
  }).status();
}
