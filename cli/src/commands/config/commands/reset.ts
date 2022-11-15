import { chalk, cliffy, yaml } from '../../../../deps.ts';
import { changeValueAtKey } from '../../../lib/changeValueAtKey.ts';
import { getSettings } from '../../../lib/getSettings.ts';
import { getSettingsPath } from '../../../lib/getSettingsPath.ts';
import { KeyType } from '../../../lib/KeyType.ts';
import { println } from '../../../lib/println.ts';

export const reset = new cliffy.Command();

reset
  .name('reset')
  .type('Key', new KeyType())
  .arguments('[key:Key]')
  .description('Get the value of a certain config setting')
  .action(async (options, key) => {
    if (!key) {
      const path = await getSettingsPath();
      if (!path) return println(`\n  ${chalk.red.bold('Error occured:')}\n\n    Could not find .zaprc.yaml file.`);

      await Deno.writeTextFile(path, '');
      return;
    }

    const { customSettings } = await getSettings();
    const newSettings = changeValueAtKey(customSettings, key, null, true);

    const path = await getSettingsPath();
    if (!path) return println(`\n  ${chalk.red.bold('Error occured:')}\n\n    Could not find .zaprc.yaml file.`);

    await Deno.writeTextFile(path, yaml.stringify(newSettings as any));
  });
