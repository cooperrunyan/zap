import { cliffy } from '../../../../deps.ts';
import { getSettingsPath } from '../../../lib/getSettingsPath.ts';
import { println } from '../../../lib/println.ts';

export const cat = new cliffy.Command();

cat
  .name('cat')
  .description('Get the contents of the zap config file')
  .action(async () => {
    const path = await getSettingsPath();
    if (path) return await Deno.readTextFile(path).then(println);

    println('No config file found');
  });
