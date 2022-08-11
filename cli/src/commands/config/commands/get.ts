import { chalk, cliffy } from '../../../../deps.ts';
import { findConfig } from '../../../lib/findConfig.ts';
import { getSettings } from '../../../lib/getSettings.ts';
import { KeyType } from '../../../lib/KeyType.ts';
import { println } from '../../../lib/println.ts';
import { helpWith } from './help.ts';

export const get = new cliffy.Command();

get
  .name('get')
  .type('Key', new KeyType())
  .arguments('[key:Key]')
  .description('Get the value of a certain config setting')
  .action(async (options, key) => {
    const obj: any = key ? await findConfig(key) : null;
    const { customSettings, defaultSettings } = await getSettings();
    const value: any = key ? getKey(customSettings, key) : null;
    const defaultValue: any = key ? getKey(defaultSettings, key) : null;
    if (['string', 'number', 'boolean'].includes(typeof defaultValue)) {
      println(
        `
  ${
    obj?.description
      ? `${chalk.bold('Description: ')}

    ${obj?.description}
    `
      : ''
  }
  ${chalk.bold('Current Value:')} ${
          value !== null ? chalk.blue(value) : chalk.red('None') + ' ' + chalk.gray('(will fallback to default)')
        }
  ${chalk.bold('Default Value:')} ${chalk.blue(defaultValue)}

  ${chalk.bold('Comment:')}

    For additional help, run ${chalk.bold(`\`zap config help ${key}\``)}
    To change this value, run ${chalk.bold(`\`zap config set ${key} ${chalk.magenta('[NEW_VALUE]')}\``)}
  `
      );
    } else {
      helpWith(key);
    }
  });

function getKey<ObjectType>(object: ObjectType, path: string) {
  try {
    const keys = path.split('.');
    let result = object;
    for (const key of keys) result = (result as any)[key];
    return result;
  } catch {
    return null;
  }
}
