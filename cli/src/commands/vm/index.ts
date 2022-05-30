import { cliffy } from '../../../deps.ts';

import { ls } from './commands/ls.ts';
import { use } from './commands/use.ts';

export const vm = new cliffy.Command();

vm.name('vm')
  .description("Manage Zap's config settings")
  .action(() => vm.showHelp());

vm.command('ls', ls);
vm.command('use', use);
