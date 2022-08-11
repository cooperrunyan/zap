import schema from '../../../../../settings-schema.json' assert { type: 'json' };
import { chalk, cliffy } from '../../../../deps.ts';
import { findConfig } from '../../../lib/findConfig.ts';
import { KeyType } from '../../../lib/KeyType.ts';
import { println } from '../../../lib/println.ts';

export const help = new cliffy.Command();

help
  .name('help')
  .description('Get help for config settings')
  .type('Key', new KeyType())
  .arguments('[key:Key]')
  .example('help', 'Displays all categories')
  .example('help theme', 'Displays the properties of the "theme" key')
  .example('help theme.backgroundColor', 'Displays the properties of the "theme.backgroundColor" key')
  .action(async (options, key) => {
    helpWith(key);
  });

const helpWith = async (key: string | undefined) => {
  const obj: any = key ? await findConfig(key) : schema;

  console.log(obj);

  const { description, type, properties: children } = obj as any;

  const maxChildNameLength = children ? Math.max(...Object.keys(children).map((k) => k.length)) : 0;
  const maxChildTypeLength = children ? Math.max(...Object.values(children).map((v: any) => v?.type?.length), 4) : 0;

  const minKeyLength = obj.default ? 9 : 6;

  await println(
    `
  ${chalk.bold('Key:  '.padEnd(minKeyLength))} ${chalk.cyan(key || 'base')}
  ${chalk.bold('Type: '.padEnd(minKeyLength))} ${chalk.magenta(type)} ${
      obj.default
        ? `
  ${chalk.bold('Default: '.padEnd(minKeyLength))} ${chalk.yellow(obj.default)}`
        : ''
    }

  ${chalk.bold('Description:')}

    ${description}
    `
  );
  if (children) {
    await println(chalk.bold('Children:\n'));
    for (const [keyname, value] of Object.entries(children)) {
      await println(
        `    ${chalk.blue(keyname.padEnd(maxChildNameLength))}  ${chalk.magenta(
          (value as any).type.padEnd(maxChildTypeLength)
        )}  ${chalk.red('-')} ${(value as any).description}`
      );
    }
    await println('');
  }
  if (obj.examples) {
    await println(chalk.bold('Examples:\n'));
    for (const ex of obj.examples) {
      await println(`    ${chalk.red('-')} ${chalk.green(`"${ex}"`)}`);
    }
    await println('');
  }
};
