import { cliffy } from './deps.ts';

import { open, openDirectory } from './src/commands/open/index.ts';
import { config } from './src/commands/config/index.ts';
import { vm } from './src/commands/vm/index.ts';

const zap = new cliffy.Command();

zap
  .name('zap')
  .usage('<subcommand> [args]')
  .version('0.0.0')
  .action(() => zap.showHelp());

zap.command('open', open);
zap.command('config', config);
zap.command('vm', vm);

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
  new cliffy.Command().hidden().action(() => openDirectory('.'))
);

zap.parse(Deno.args);
