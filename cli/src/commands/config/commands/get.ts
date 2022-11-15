import { chalk, cliffy } from '../../../../deps.ts';
import { findConfig } from '../../../lib/findConfig.ts';
import { getKey } from '../../../lib/getKey.ts';
import { getSettings } from '../../../lib/getSettings.ts';
import { KeyType } from '../../../lib/KeyType.ts';
import { println } from '../../../lib/println.ts';
import { helpWith } from './help.ts';

export const get = new cliffy.Command();

const keyType = new KeyType();
const values = keyType.values();

get
  .name('get')
  .type('Key', keyType)
  .arguments('[key:Key]')
  .option('--custom', 'Show only the custom (changed) settings')
  .description('Get the value of a certain config setting')
  .action(async ({ custom }, key) => {
    const obj: any = key ? await findConfig(key) : null;
    const { customSettings, defaultSettings } = await getSettings();

    if (custom) {
      const modifiedKeys = [];
      println(`
  ${chalk.bold('Modified:')}
`);
      for (const key of values) {
        if (getKey(customSettings, key)) modifiedKeys.push(key);
      }

      println(
        modifiedKeys
          .map((k) => {
            const re = new RegExp(k);
            for (const key of values) {
              if (re.test(key) && k !== key) return null; // If it is only a fragment of another complete key
            }
            return k;
          })
          .filter((_) => _)
          .map((key) => `  ${chalk.red('-')} ${chalk.blue(key)}`)
          .join('\n')
      );

      println('');
      return;
    }

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
