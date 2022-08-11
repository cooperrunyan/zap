import { chalk, cliffy, yaml } from '../../../../deps.ts';
import { changeValueAtKey } from '../../../lib/changeValueAtKey.ts';
import { getKey } from '../../../lib/getKey.ts';
import { getSettings } from '../../../lib/getSettings.ts';
import { getSettingsPath } from '../../../lib/getSettingsPath.ts';
import { KeyType } from '../../../lib/KeyType.ts';
import { println } from '../../../lib/println.ts';

export const set = new cliffy.Command();

set
  .name('set')
  .description('Set the value of a certain config setting')
  .type('Key', new KeyType())
  .arguments('<key:Key> <value:string>')
  .action(async (options, key, value) => {
    const { customSettings, defaultSettings } = await getSettings();
    const oldValue = getKey(customSettings, key);
    const defaultValue = getKey(defaultSettings, key);
    const newSettings = changeValueAtKey(customSettings, key, value);
    const newValue = getKey(newSettings, key);

    if (newSettings === 'key not found')
      return println(`\n  ${chalk.red.bold('Error occured:')}\n\n    Could not find that key.\n`);

    if (newSettings === 'cannot change directly')
      return println(`\n  ${chalk.red.bold('Error occured:')}\n\n    That key cannot be directly changed.\n`);

    const path = await getSettingsPath();
    if (!path) return println(`\n  ${chalk.red.bold('Error occured:')}\n\n    Could not find .zaprc.yaml file.`);

    await Deno.writeTextFile(path, yaml.stringify(newSettings as any));

    println(`
  ${chalk.bold('Success:')}

    ${chalk.red('-')} ${chalk.blue('Current:')} ${chalk.magenta(newValue)}
    ${chalk.red('-')} ${chalk.blue('Old:    ')} ${chalk.grey(oldValue)}
    ${chalk.red('-')} ${chalk.blue('Default:')} ${chalk.grey(defaultValue)}
`);
  });
