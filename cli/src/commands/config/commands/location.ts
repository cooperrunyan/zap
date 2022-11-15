import { cliffy } from '../../../../deps.ts';
import { getSettingsPath } from '../../../lib/getSettingsPath.ts';

export const location = new cliffy.Command();

location
  .name('location')
  .description('Get the path to the config file')
  .action(async () => {
    Deno.stdout.write(new TextEncoder().encode(((await getSettingsPath()) || 'null') + '\n'));
  });
