import { cliffy } from './deps.ts';

import pkg from '../package.json' assert { type: 'json' };

import { config } from './src/commands/config/index.ts';
import { open } from './src/commands/open/index.ts';
import { openApp } from './src/lib/openApp.ts';

const zap = new cliffy.Command();

zap
  .name(pkg.name)
  .usage('<subcommand> [args]')
  .version(pkg.version)
  .action(() => zap.showHelp());

zap.command('open', open);
zap.command('config', config);

zap.command(
  'help',
  new cliffy.Command()
    .description('Get help for a command')
    .arguments('[...subcommand]')
    .action((_, subcommand) => {
      if (!subcommand) return zap.showHelp();
      zap.parse([...subcommand, '--help']);
    })
);

zap.command(
  '.',
  new cliffy.Command().hidden().action(() => openApp(['--dir', '.']))
);

zap.parse(Deno.args);
