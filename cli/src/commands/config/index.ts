import { cliffy } from '../../../deps.ts';

import { cat } from './commands/cat.ts';
import { get } from './commands/get.ts';
import { gui } from './commands/gui.ts';
import { help } from './commands/help.ts';
import { location } from './commands/location.ts';
import { set } from './commands/set.ts';

export const config = new cliffy.Command();

config
  .name('config')
  .description('Manage config for Zap application')
  .action(() => config.showHelp());

config.command('get', get);
config.command('set', set);
config.command('help', help);
config.command('gui', gui);
config.command('location', location);
config.command('cat', cat);
