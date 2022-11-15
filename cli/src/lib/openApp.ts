import { chalk } from '../../deps.ts';
import { getAppPath } from './getAppPath.ts';
import { println } from './println.ts';

export async function openApp(args?: string[]) {
  const zapPath = await getAppPath();
  const runnerPath = Deno.env.get('ZAP_RUNNER_PATH');

  if (!zapPath) {
    println(
      `\n  ${chalk.bold.red('Error:')}\n\n    There was a problem locating the path to Zap. Zap may be corrupt.\n`
    );
    Deno.exit(1);
  }

  if (!runnerPath) {
    println(`\n  ${chalk.bold.red('Error:')}\n\n    Cannot find path to zap runner.\n`);
    Deno.exit(1);
  }

  const cmd = [zapPath, ...(args || [])];

  Deno.run({
    cmd: [runnerPath, ...cmd]
  }).status();
}
