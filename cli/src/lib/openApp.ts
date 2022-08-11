import { chalk } from '../../deps.ts';
import { getAppPath } from './getAppPath.ts';
import { println } from './println.ts';

export async function openApp(args?: string[]) {
  const zapPath = await getAppPath();

  if (!zapPath) {
    println(
      `\n  ${chalk.bold.red('Error:')}\n\n    There was a problem locating the path to Zap. Zap may be corrupt.\n`
    );
    Deno.exit(1);
  }

  Deno.run({
    cmd: [zapPath, ...(args || [])]
  }).status();
}
