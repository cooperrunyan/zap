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
  .example('help color.background', 'Displays the properties of the "color.background" key')
  .action(async (options, key) => {
    helpWith(key);
  });

export const helpWith = async (key: string | undefined) => {
  const obj: any = key ? await findConfig(key) : schema;

  const { description, type, properties: children, enum: enumValue } = obj as any;

  const maxChildNameLength = children ? Math.max(...Object.keys(children).map((k) => k.length)) : 0;
  const maxChildTypeLength = children ? Math.max(...Object.values(children).map((v: any) => v?.type?.length), 4) : 0;

  const minKeyLength = obj.default ? 9 : 6;

  println(
    `
  ${chalk.bold('Key:  '.padEnd(minKeyLength))} ${chalk.cyan(key || 'base')}
  ${chalk.bold('Type: '.padEnd(minKeyLength))} ${chalk.magenta(enumValue ? enumValue.join(' | ') : type)} ${
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
    println(chalk.bold('  Children:\n'));
    for (const [keyname, value] of Object.entries(children)) {
      println(
        `    ${chalk.blue(keyname.padEnd(maxChildNameLength))}  ${chalk.magenta(
          (value as any).type.padEnd(maxChildTypeLength)
        )}  ${chalk.red('-')} ${(value as any).description}`
      );
    }
    println('');
  }
  if (obj.examples) {
    println(chalk.bold('Examples:\n'));
    for (const ex of obj.examples) {
      println(`    ${chalk.red('-')} ${chalk.green(`"${ex}"`)}`);
    }
    println('');
  }
  if (obj.$comment) {
    println(`  ${chalk.bold('Comment:')}\n\n    ${obj.$comment}\n`);
  }
};
